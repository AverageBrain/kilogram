import { Controller, Get, Req, UseBefore, Post } from 'routing-controllers';
import passport from 'passport';
import express from 'express';

@Controller()
export class AuthController {
  @Get('/auth/github')
  @UseBefore(passport.authenticate('github'))
  authWithGithub(@Req() request: express.Request) {
    console.log('auth');
  }

  // @Get("/auth/github/callback")
  // @UseBefore(passport.authenticate('github', {failureRedirect: '/'}))
  // authGithubCallback(@Res() response: express.Response) {
  //     response.sendStatus(200)
  // }

  @Post('/logout')
  logout(@Req() request: express.Request) {
    request.logout((err) => err ? '' : '');

    return { message: 'Successfully logged out' };
  }
}
