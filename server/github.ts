import passportGithub from "passport-github";
import {UserController} from "./controllers/UserController";

const userController = new UserController()

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: 'c6264da0a139e182368f' as string,
        clientSecret: '15aff26175f4d18bd476102c3d57f85a4fc293cd' as string,
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const profileUsername: string = profile.username ? profile.username : ""
        const user = await userController.getOrCreateUserByGithub(profile.id, profile.displayName, profileUsername)
        done(null, user);
    })
;

export {githubStrategy}