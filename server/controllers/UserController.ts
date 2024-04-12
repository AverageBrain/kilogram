import {BodyParam, Get, JsonController, Param, Post, Req} from 'routing-controllers';
import * as types from '../../src/types';
import express from 'express';
import {prisma} from "../domain/PrismaClient";
import {User} from "@prisma/client";


export function convertPrismaUser(prismaUser: User): types.UserType {
    return {
        createdAt: prismaUser.createdAt,
        id: prismaUser.id,
        name: prismaUser.name,
        updatedAt: prismaUser.updatedAt,
        username: prismaUser.username
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

    @Get("/users/:afterId")
    async getUsers(@Param("afterId") afterId: number): Promise<types.UserType[]> {
        if (afterId == -1) {
            // first page -- new users
            afterId = await prisma.user.count()
        }
        const users: User[] = await prisma.user.findMany({where: {id: {lt: afterId}}, take: 10, orderBy: {id: "desc"}})
        return users.map(i => convertPrismaUser(i))
    }
}
