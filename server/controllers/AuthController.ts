import {Controller, Get, Redirect, Req, UseBefore} from 'routing-controllers';
import passport from "passport";
import express from 'express';


@Controller()
export class AuthController {
    @Get("/auth/github")
    @UseBefore(passport.authenticate('github'))
    authWithGithub(@Req() request: express.Request) {
    }

    @Get("/auth/github/callback")
    @UseBefore(passport.authenticate('github', {failureRedirect: '/'}))
    @Redirect('/')
    authGithubCallback() {
    }

    @Get('/logout')
    @Redirect("/")
    logout(@Req() request: express.Request) {
        request.logout(err => err ? "" : "")
    }
}
