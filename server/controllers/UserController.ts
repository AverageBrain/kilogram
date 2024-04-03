import {BodyParam, Controller, Get, JsonController, Post, Req} from 'routing-controllers';
import * as types from '../../src/types';
import express from 'express';
import {prisma} from "../domain/PrismaClient";
import {User} from "@prisma/client";


function convertPrismaUser(prismaUser: User): types.User {
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
    async getMe(@Req() request: express.Request): Promise<types.User | null> {
        const sessionUser = request.user
        if (sessionUser?.prismaUser != undefined) {
            return convertPrismaUser(sessionUser.prismaUser)
        }
        return null
    }

    @Post("/edit")
    async editMe(@Req() request: express.Request, @BodyParam("user") user: types.User): Promise<types.User | null> {
        const sessionUser = request.user
        if (user != undefined) {
            const localUser = await prisma.user.findUniqueOrThrow({where: {githubId: sessionUser?.toString()}})
            localUser.name = user.name
            localUser.username = user.username
            return convertPrismaUser(localUser)
        }
        return null
    }
}
