import {Controller, Get, Redirect, Req, Res, UseBefore} from 'routing-controllers';
import passport from "passport";
import express from 'express';


@Controller()
export class AuthController {
    @Get("/auth/github")
    @UseBefore(passport.authenticate('github'))
    authWithGithub(@Req() request: express.Request) {
    }

    // @Get("/auth/github/callback")
    // @UseBefore(passport.authenticate('github', {failureRedirect: '/'}))
    // authGithubCallback(@Res() response: express.Response) {
    //     response.sendStatus(200)
    // }

    @Get('/logout')
    @Redirect("/")
    logout(@Req() request: express.Request) {
        request.logout(err => err ? "" : "")
    }
}
