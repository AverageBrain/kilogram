import {BodyParam, Get, JsonController, Param, Post, Req, Res} from 'routing-controllers';
import * as types from '../../src/types';
import express from 'express';
import {prisma} from "../domain/PrismaClient";
import {User} from "@prisma/client";
import {UserAvatarService} from "../services/UserAvatarService";
import {UploadedFile} from "express-fileupload"
import {RedisStore} from "../services/RedisStore";
import {FileInfo} from "../models/FileInfo";

const redisStore = new RedisStore()

export function convertPrismaUser(prismaUser: User, userStatus?: boolean): types.UserType {
    return {
        createdAt: prismaUser.createdAt,
        id: prismaUser.id,
        name: prismaUser.name,
        updatedAt: prismaUser.updatedAt,
        username: prismaUser.username,
    }
}

@JsonController("/user")
export class UserController {
    @Get("/me")
    async getMe(@Req() request: express.Request): Promise<types.UserType | {}> {
        const sessionUser = request.user
        if (sessionUser?.prismaUser) {
            return convertPrismaUser(sessionUser.prismaUser)
        }
        // not authorized
        return {};
    }

    @Get("/users")
    async getUsers(
        @Req() request: express.Request,
    ): Promise<types.UserType[]> {
        const sessionUser = request.user?.prismaUser
        if (!sessionUser) {
            throw new Error("User must be authorized")
        }

        const users: User[] = await prisma.user.findMany({
            where: {
                NOT: {
                    id: {
                        equals: sessionUser.id,
                    }
                }
            }
        });
        return users.map(i => convertPrismaUser(i));
    }

    @Post("/edit")
    async editMe(@Req() request: express.Request, @BodyParam("user") user: types.UserType): Promise<types.UserType> {
        const sessionUser = request.user
        if (!user) {
            throw new Error("User must be authorized")
        }
        const localUser = await prisma.user.findUniqueOrThrow({where: {githubId: sessionUser?.toString()}})
        localUser.name = user.name
        localUser.username = user.username
        return convertPrismaUser(localUser)
    }

    @Get("/users/find/:prefix")
    async findUsers(@Req() request: express.Request, @Param("prefix") prefix: string): Promise<types.UserType[]> {
        if (!prefix) return [];
        const sessionUser = request.user;
        if (sessionUser?.prismaUser) {
            const users: User[] = await prisma.user.findMany({
                where: {
                    AND: [{
                        username: {startsWith: prefix, mode: 'insensitive'}},
                        {NOT: {id: {equals: sessionUser?.prismaUser?.id}}
                    }]
                }
            })
            const usersStatuses = await redisStore.getStatus(users.map(i => i.id))
            return users.map(user => convertPrismaUser(user, usersStatuses.get(user.id)));
        }
        return [];
    }

    @Post("/uploadAvatar")
    async uploadAvatar(
        @Res() response: express.Response,
        @Req() request: express.Request,
        @BodyParam("id") id: number,
    ) {
        const files = request.files
        let result = null

        if (!files) {
            result = await UserAvatarService.createAvatar(id.toString())
        } else {
            const avatar: UploadedFile | UploadedFile[] = files.avatar;
            if (!avatar) throw Error("Неверное имя инпута для аватара")
            if (Array.isArray(avatar)) throw Error("Можно загружать только один аватар")

            const avatarFileInfo: FileInfo = {
                data: avatar.data,
                name: avatar.name,
                mimetype: avatar.mimetype
            }

            result = await UserAvatarService.createAvatar(id.toString(), avatarFileInfo)
        }

        return result === null ? response.sendStatus(500) : response.status(200).send(result)
    }

    @Get("/avatar/:id")
    async getAvatar(
        @Res() response: express.Response,
        @Param("id") id: number,
    ) {
        if (!id) throw new Error("Id required")
        return await UserAvatarService.getAvatar(id.toString())
    }
}
