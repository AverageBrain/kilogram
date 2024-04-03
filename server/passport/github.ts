import passportGithub from "passport-github";
import {UserService} from "../services/UserService";

const userService = new UserService()

export const githubStrategy = new passportGithub.Strategy(
    {
        clientID: 'c6264da0a139e182368f' as string,
        clientSecret: '15aff26175f4d18bd476102c3d57f85a4fc293cd' as string,
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const profileUsername: string = profile.username ? profile.username : ""
        const user = await userService.getOrCreateUserByGithub(profile.id, profile.displayName, profileUsername)
        done(null, {userId: user.id, prismaUser: user});
    })
;

