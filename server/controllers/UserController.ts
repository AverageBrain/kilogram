import { BodyParam, Get, JsonController, Param, Post, QueryParam, Req, Res } from 'routing-controllers';
import * as types from '../../src/types';
import express from 'express';
import { prisma } from "../domain/PrismaClient";
import { User } from "@prisma/client";
import { UserAvatarService } from "../services/UserAvatarService";
import { UploadedFile } from "express-fileupload"
import { RedisStore } from "../services/RedisStore";

const redisStore = new RedisStore()

export function convertPrismaUser(prismaUser: User, userStatus?: boolean): types.UserType {
    return {
        createdAt: prismaUser.createdAt,
        id: prismaUser.id,
        name: prismaUser.name,
        updatedAt: prismaUser.updatedAt,
        username: prismaUser.username,
        userStatus,
        lastSeen: prismaUser.lastSeen,
    }
}

@JsonController("/user")
export class UserController {
    @Get("/me")
    async getMe(@Req() request: express.Request): Promise<types.UserType | {}> {
        const sessionUser = request.user
        if (sessionUser?.prismaUser) {
            return convertPrismaUser(sessionUser.prismaUser, true)
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
        const usersStatuses = await redisStore.getStatus(users.map(i => i.id))

        return users.map(i => convertPrismaUser(i, usersStatuses.get(i.id)))
    }

    @Post("/edit")
    async editMe(@Req() request: express.Request, @BodyParam("user") user: types.UserType): Promise<types.UserType> {
        const sessionUser = request.user
        if (!user) {
            throw new Error("User must be authorized")
        }
        const localUser = await prisma.user.findUniqueOrThrow({ where: { githubId: sessionUser?.toString() } })
        localUser.name = user.name
        localUser.username = user.username
        return convertPrismaUser(localUser)
    }

    @Get("/users/find/:prefix")
    async findUsers(@Req() request: express.Request, @Param("prefix") prefix: string): Promise<types.UserType[]> {
        if (!prefix) {
            return [];
        }
        const sessionUser = request.user;
        if (sessionUser?.prismaUser) {
            const users: User[] = await prisma.user.findMany({
                where: {
                    AND: [
                        {
                            username: {
                                startsWith: prefix,
                            },
                        },
                        {
                            NOT: {
                                id: {
                                    equals: sessionUser?.prismaUser?.id,
                                }
                            }
                        }
                    ]

                }
            })
            const usersStatuses = await redisStore.getStatus(users.map(i => i.id))

            return users.map(i => convertPrismaUser(i, usersStatuses.get(i.id)));
        }
        return [];
    }

    @Post("/uploadAvatar")
    async uploadAvatar(
        @Res() response: express.Response,
        @Req() request: express.Request,
        @BodyParam("username") username: string,
    ) {
        const files = request.files
        let result

        if (files === undefined || files === null) {
            result = await UserAvatarService.createAvatar(username)
        } else {
            const avatar: UploadedFile | UploadedFile[] = files.avatar;
            if (Array.isArray(avatar)) throw Error("Можно загружать только один аватар")

            result = await UserAvatarService.createAvatar(username, avatar)
        }

        return result === null ? response.sendStatus(400) : response.sendStatus(200)
    }

    @Get("/avatar/:id")
    async getAvatar(
        @Res() response: express.Response,
        @Param("id") id: number,
    ) {
        const byte64Avatar = await UserAvatarService.getAvatar(id)
        const avatar = Buffer.from(byte64Avatar, 'base64').toString()

        return response.set('Content-Type', 'image/svg+xml').send(avatar)
    }
}
