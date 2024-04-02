import {BodyParam, Controller, Get, Post, Redirect, Req, UseBefore} from 'routing-controllers';
import * as types from '../../src/types';
import passport from "passport";
import express from 'express';
import {prisma} from "../domain/PrismaClient";
import {User} from "@prisma/client";
import {GithubAuthenticate, GithubAuthentication} from "../middleware/GithubAuthentificateMiddleware";


function convertPrismaUser(prismaUser: User): types.User {
    return {
        createdAt: prismaUser.createdAt,
        id: prismaUser.id,
        name: prismaUser.name,
        updatedAt: prismaUser.updatedAt,
        username: prismaUser.username
    }
}


@Controller()
export class UserController {
    @Get("/auth/github")
    @UseBefore(GithubAuthenticate)
    authWithGithub(@Req() request: express.Request) {
        console.log("YES1")
    }

    @Get("/auth/github/callback")
    @UseBefore(GithubAuthentication)
    @Redirect("/")
    authGithubCallback() {
        passport.authenticate('github', {failureRedirect: '/'})
    }

    @Post()
    @UseBefore(passport.authenticate('local', {failureRedirect: '/login', failureMessage: true}))
    authWithPassword() {

    }

    @Get("/user/me")
    async getMe(@Req() request: express.Request): Promise<types.User | null> {
        const sessionUser = request.user
        if (sessionUser != undefined) {
            const localUser = await prisma.user.findUniqueOrThrow({where: {id: sessionUser.id}})
            return convertPrismaUser(localUser)
        }
        return null
    }

    @Post("/user/edit")
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

    @Get('/logout')
    @Redirect("/")
    logout(@Req() request: express.Request) {
        request.logout(err => err ? "" : "")
    }
}
