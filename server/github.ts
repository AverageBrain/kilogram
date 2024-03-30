// Создаём стратегию для аутентификации через GitHub
import passportGithub from "passport-github";
import {UserRepository} from "./domain/repository/UserRepository";
import {User} from "./domain/entity/User";

const userRepository: UserRepository = new UserRepository()

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: 'c6264da0a139e182368f' as string,
        clientSecret: '15aff26175f4d18bd476102c3d57f85a4fc293cd' as string,
        // Адрес, на который пользователь будет возвращён после авторизации в GitHub
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        // В этом месте можно сохранить пользователя в свою базу
        // или найти уже существующего в базе по данным из `profile`
        //
        const user: User | null = await userRepository.findByFieldFirst('githubId', profile.id);

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
    })
;

export {githubStrategy}