import {BodyParam, Get, JsonController, Param, Post, Req, Res} from "routing-controllers";
import {Message, UserChat} from "@prisma/client";
import express from "express";
import { load } from 'cheerio';

import {ChatService} from "../services/ChatService";
import {prisma} from "../domain/PrismaClient";
import * as types from '../../src/types';
import {UserService} from "../services/UserService";
import {convertPrismaUser} from "./UserController";
import {getIdCondition, groupBy} from "../utils";
import {makeRandomString} from "../utils/makeid";
import {MessageReactionType, TypeOfChat} from "../../src/types/types";


const chatService = new ChatService()
const userService = new UserService()

export function convertPrismaMessage(prismaMessage: Message, reactions: MessageReactionType[]): types.MessageType {
    return {
        id: prismaMessage.id,
        createdAt: prismaMessage.createdAt,
        updatedAt: prismaMessage.updatedAt,
        chatId: prismaMessage.chatId,
        userId: prismaMessage.userId,
        text: prismaMessage.text,
        reactions: reactions
    }
}


// TODO: возвращать, а не кидать ошибки
@JsonController("/chat")
export class ChatController {
    @Post("/send")
    async sendMessage(
        @Req() request: express.Request,
        @BodyParam('message') message: {
            chatId: number
            text: string
        }
    ): Promise<types.MessageType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        return convertPrismaMessage(await chatService.sendMessage(user, message), [])
    }

    @Post("/send/delay")
    async sendDelayMessage(
        @Req() request: express.Request,
        @BodyParam('delayMessage') delayMessage: {
            chatId: number
            text: string
            inTime: Date
        }
    ): Promise<types.DelayMessageType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        const userChats = await prisma.userChat.findMany({where: {chatId: delayMessage.chatId}})
        if (!userChats.find((chat) => chat.userId === user.id) || userChats.length !== 2) {
            throw new Error("User has no access to the chat")
        }

        if (delayMessage.inTime <= new Date()) {
            throw new Error("InTime must be greater than current date")
        }

        return prisma.delayMessage.create({
            data: {
                chatId: delayMessage.chatId,
                text: delayMessage.text,
                userId: user.id,
                inTime: delayMessage.inTime,
            }
        })
    }

    @Post("/remove/delay")
    async removeDelayMessage(
        @Req() request: express.Request,
        @BodyParam('delayMessage') delayMessage: {
            delayMessageId: number
        }
    ): Promise<types.DelayMessageType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        const removedDelayMessage = await prisma.delayMessage.findUnique({where: {id: delayMessage.delayMessageId}})
        if (removedDelayMessage == null) {
            throw new Error("Delayed message not found")
        }

        if (removedDelayMessage.userId != user.id) {
            throw new Error("Access denied")
        }

        return prisma.delayMessage.delete({where: {id: removedDelayMessage.id}})
    }

    @Get("/messages/delay/all")
    async getAllDelayMessage(
        @Req() request: express.Request
    ): Promise<types.DelayMessageType[]> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        return prisma.delayMessage.findMany({where: {userId: user.id}})
    }

    @Post("/create/chat")
    async createChat(
        @Req() request: express.Request,
        @BodyParam('createChat') createChat: {
            userId: number
        }
    ): Promise<types.ChatType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        const toUser = await userService.getUserById(createChat.userId)
        if (toUser == null) {
            throw new Error("User not find")
        }
        const alreadyChat = await prisma.userChat.findFirst({
            where: {
                AND: [
                    {userId: user.id},
                    {chat: {members: {some: {userId: toUser.id}}}}
                ]
            }
        })
        if (alreadyChat) {
            throw new Error("Chat already exists")
        }


        const chat = await prisma.chat.create({data: {}})
        await Promise.all([
            prisma.userChat.create({data: {userId: user.id, chatId: chat.id}}),
            prisma.userChat.create({data: {userId: toUser.id, chatId: chat.id}})
        ])
        return {
            createdAt: chat.createdAt,
            id: chat.id,
            messages: [],
            updatedAt: chat.updatedAt,
            name: toUser.name,
            users: [convertPrismaUser(toUser)],
            type: TypeOfChat.Chat,
        }
    }

    @Post("/create/group")
    async createGroup(
        @Req() request: express.Request,
        @BodyParam('createGroup') createGroup: {
            userIds: number[];
            name: string;
        }
    ): Promise<types.ChatType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        createGroup.userIds = createGroup.userIds.filter(i => i != user.id)
        const toUsers = await userService.getUsersById(createGroup.userIds)
        const group = await prisma.chat.create({
            data: { type: TypeOfChat.Group, name: createGroup.name, joinKey: makeRandomString(20) }
        });

        const createManyUserChat = toUsers.map((user) =>
            prisma.userChat.create({
                data: {userId: user.id, chatId: group.id},
            }),
        )
        await Promise.all(createManyUserChat);
        await prisma.userChat.create({data: {userId: user.id, chatId: group.id}});

        return {
            createdAt: group.createdAt,
            id: group.id,
            messages: [],
            name: group.name,
            updatedAt: group.updatedAt,
            users: toUsers.filter(i => i.id != user.id).map(i => convertPrismaUser(i)),
            joinKey: group.joinKey ? group.joinKey : undefined,
            type: TypeOfChat.Group,
        }
    }

    @Get("/group/:joinKey")
    async getGroupByJoinKey(
        @Res() response: express.Response,
        @Req() request: express.Request,
        @Param("joinKey") joinKey: string,
    ) {
        const user = request.user?.prismaUser;
        if (!user) {
            throw new Error("User must be authorized");
        }

        const group = await prisma.chat.findUnique({ where: { joinKey: joinKey }});
        if (group === null) {
            return response.status(400).send({ message: 'JoinKey not connected to any group' });
        }
        const alreadyUsersChat = await prisma.userChat.findMany({ where: { chatId: group.id }, include: { user: true }});
        if (alreadyUsersChat.find((item) => item.userId === user.id)) {
            return response.status(400).send({ message: 'User already joined the group' });
        }

        return {
            createdAt: group.createdAt,
            id: group.id,
            messages: [],
            updatedAt: group.updatedAt,
            name: group.name,
            users: alreadyUsersChat.map(i => convertPrismaUser(i.user)),
            joinKey: group.joinKey ?? undefined,
            type: TypeOfChat.Group,
        };
    }

    @Post("/group/join")
    async joinGroup(
        @Req() request: express.Request,
        @BodyParam('joinGroup') joinGroup: {
            joinKey: string
        }
    ): Promise<types.ChatType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        const group = await prisma.chat.findUnique({where: {joinKey: joinGroup.joinKey}})
        if (group === null) {
            throw new Error("JoinKey not connected to any group")
        }
        const alreadyUsersChat = await prisma.userChat.findMany({where: {chatId: group.id}, include: {user: true}})
        if (alreadyUsersChat.find((item) => item.userId === user.id)) {
            throw new Error("User already joined the group")
        }

        await prisma.userChat.create({
            data: {userId: user.id, chatId: group.id},
        })

        return {
            createdAt: group.createdAt,
            id: group.id,
            messages: [],
            updatedAt: group.updatedAt,
            name: group.name,
            users: alreadyUsersChat.map(i => convertPrismaUser(i.user)),
            joinKey: group.joinKey ?? undefined,
            type: TypeOfChat.Group,
        }
    }


    @Get("/chats/:afterId")
    async getMyChats(
        @Req() request: express.Request,
        @Param("afterId") afterId: number
    ): Promise<types.ChatType[]> {
        const idCondition = getIdCondition(afterId);
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }
        const userChats: UserChat[] = await prisma.userChat.findMany(
            {where: {AND: [{userId: user.id}]}, orderBy: {updatedAt: 'desc'}}
        );

        const chatsIds = userChats.map(i => i.chatId);
        const chats = await prisma.chat.findMany({
            where: {id: {in: chatsIds}},
            include: {
                messages: {take: -1, include: {reactions: {include: {reactionType: true}}}},
                members: {include: {user: true}}
            }
        });
        const chatsById = groupBy(chats, i => i.id)

        return userChats.map(c => {
            const chat = chatsById[c.chatId][0]
            const othersUserChat = chat.members.filter(i => i.userId != user.id)

            return {
                id: chat.id,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
                name: chat.name,
                users: othersUserChat.map(i => convertPrismaUser(i.user)),
                messages: chat.messages.map(i => convertPrismaMessage(i, i.reactions)) as types.MessageType[],
                type: chat.type,
                joinKey: chat.joinKey,
            } as types.ChatType
        })
    }


    @Post('/messages')
    async getMessages(
        @Req() request: express.Request,
        @BodyParam('chatMessages') chatMessages: {
            chatId: number,
            afterId: number, // first message can be get in "/chats/:afterId"
        }
    ): Promise<types.MessageType[]> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }


        const idCondition = getIdCondition(chatMessages.afterId);

        return prisma.message.findMany({
            where: {chatId: chatMessages.chatId,  id: idCondition},
            take: 15,
            orderBy: {id: "desc"},
            include: {reactions: {include: {reactionType: true}}}
        })
    }


    @Post('/reaction')
    async setReaction(
        @Req() request: express.Request,
        @BodyParam('reactionMessage') reactionMessageIn: {
            messageId: number,
            reactionTypeId: number
        }
    ): Promise<MessageReactionType> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        const message = await prisma.message.findUnique({where: {id: reactionMessageIn.messageId}})

        if (message == null) {
            throw new Error("Message not founded")
        }

        const reactionType = await prisma.reactionType.findUnique({where: {id: reactionMessageIn.reactionTypeId}})
        if (reactionType == null) {
            throw new Error("ReactionType not founded")
        }

        const reactionMessage = await prisma.messageReaction.create({
            data: {
                userId: user.id,
                reactionTypeId: reactionType.id,
                messageId: message.id
            }
        })

        return {
            id: reactionMessage.id,
            createdAt: reactionType.createdAt,
            updatedAt: reactionType.updatedAt,
            reactionType: {
                id: reactionType.id,
                createdAt: reactionType.createdAt,
                updatedAt: reactionType.updatedAt,
                emoji: reactionType.emoji
            },
            userId: user.id,
        }
    }

    @Post('/metadata')
    async getMetadata(
        @Req() request: express.Request,
        @BodyParam('url') url: string,
    ): Promise<types.MetadataType> {
      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);
  
      const title = $('meta[property="og:title"]').attr('content') ?? $('title').text() ?? $('meta[name="title"]').attr('content');
      const description = $('meta[property="og:description"]').attr('content') ?? $('meta[name="description"]').attr('content');
      const imageUrl = $('meta[property="og:image"]').attr('content') ?? $('meta[property="og:image:url"]').attr('content');
  
      return { title, description, imageUrl };
    }
}