import myPassport, { DoneCallback } from 'passport';
import { githubStrategy } from './github';
import { UserService } from '../services/UserService';

myPassport.use(githubStrategy);

const userService = new UserService();

myPassport.serializeUser((profile: Express.User, done: DoneCallback) => {
  done(null, { userId: profile.userId, prismaUser: null });
});

myPassport.deserializeUser(async (profile: Express.User, done: DoneCallback) => {
  try {
    const user = await userService.getUserById(profile.userId);
    done(null, { userId: profile.userId, prismaUser: user });
  } catch (e) {
    done(e, profile);
  }
});

export { myPassport };
