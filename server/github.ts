// Создаём стратегию для аутентификации через GitHub
import passportGithub from "passport-github";
import {UserRepository} from "./domain/repository/UserRepository";

const userRepository: UserRepository = new UserRepository()

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: 'c6264da0a139e182368f' as string,
        clientSecret: '15aff26175f4d18bd476102c3d57f85a4fc293cd' as string,
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        userRepository.findByFieldFirst('githubid', profile.id).then(user => {
            if (user !== null) {
                done(null, user);
            } else {
                const profileUsername: string | undefined = profile.username;

                if (profileUsername === undefined) {
                    throw Error('Cannot resolve github profile username');
                }
                const newUser = userRepository.save({
                    username: profileUsername,
                    name: profile.displayName,
                    githubId: profile.id
                });

                done(null, newUser);
            }
        });
    })
;

export {githubStrategy}