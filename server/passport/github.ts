import passportGithub from 'passport-github';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const githubStrategy = new passportGithub.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
  async (accessToken, refreshToken, profile, done) => {
    const profileUsername: string = profile.username ? profile.username : '';
    const user = await userService.getOrCreateUserByGithub(profile.id, profile.displayName, profileUsername);
    done(null, { userId: user.id, prismaUser: user });
  })
;
