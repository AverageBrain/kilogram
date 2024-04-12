import {BodyParam, Get, JsonController, Param, Post, Req} from "routing-controllers";
import {UserChat} from "@prisma/client";
import express from "express";
import {ChatService} from "../services/ChatService";
import {prisma} from "../domain/PrismaClient";
import * as types from '../../src/types';
import {UserService} from "../services/UserService";
import {convertPrismaUser} from "./UserController";
import {groupBy} from "../utils";
import {SSEService} from "../services/SSEService";


const chatService = new ChatService()
const userService = new UserService()
const sseService = new SSEService()

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

        const userChats = await prisma.userChat.findMany({where: {chatId: message.chatId}})
        if (!userChats.find((chat) => chat.userId === user.id) || userChats.length !== 2) {
            throw new Error("User has no access to the chat")
        }

        await Promise.all(userChats.map(async (userChat) => {
            userChat.updatedAt = new Date()
            return await prisma.userChat.update({data: userChat, where: {id: userChat.id}})
        }));

        const sendMessage = await prisma.message.create({
            data: {
                chatId: message.chatId,
                text: message.text,
                userId: user.id
            }
        })

        const chatUsers = await prisma.userChat.findMany({where: {chatId: userChats[0].chatId}})

        chatUsers.forEach(uc => uc.userId != user.id ? sseService.publishMessage(uc.userId, "newMessage", sendMessage) : null)

        return sendMessage
    }

    @Post("/create")
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
            user: convertPrismaUser(toUser)
        }
    }

    @Get("/chats/:afterId")
    async getMyChats(
        @Req() request: express.Request,
        @Param("afterId") afterId: number
    ): Promise<types.ChatType[]> {
        if (afterId == -1) {
            // first page -- new users
            afterId = await prisma.user.count()
        }
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }
        const userChats: UserChat[] = await prisma.userChat.findMany(
            {where: {AND: [{userId: user.id}]}, take: 10, orderBy: {updatedAt: 'desc'}}
        );


        const chatsIds = userChats.map(i => i.chatId);
        const chats = await prisma.chat.findMany({
            where: {id: {in: chatsIds}},
            include: {messages: {take: -1}, members: {include: {user: true}}}
        });
        const chatsById = groupBy(chats, i => i.id)

        return userChats.map(c => {
            const chat = chatsById[c.chatId][0]
            const otherUserChat = chat.members[0].userId == user.id ? chat.members[1] : chat.members[0]

            return {
                id: chat.id,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
                user: convertPrismaUser(otherUserChat.user),
                messages: chat.messages as types.MessageType[]
            } as types.ChatType
        })
    }


    @Post('/messages')
    async getMessages(
        @Req() request: express.Request,
        @BodyParam('chatMessages') chatMessages: {
            chatId: number,
            offset: number, // first message can be get in "/chats/:afterId"
        }
    ): Promise<types.MessageType[]> {
        const user = request.user?.prismaUser
        if (!user) {
            throw new Error("User must be authorized")
        }

        return prisma.message.findMany({
            where: {chatId: chatMessages.chatId},
            skip: chatMessages.offset,
            take: 15,
            orderBy: {id: "desc"}
        });
    }

}