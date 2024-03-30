// Создаём стратегию для аутентификации через GitHub
import passportGithub from "passport-github";

const githubStrategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        // Адрес, на который пользователь будет возвращён после авторизации в GitHub
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        // В этом месте можно сохранить пользователя в свою базу
        // или найти уже существующего в базе по данным из `profile`
        //
        // User.findOrCreate(profile.username, (err, profile) => {
        //     done(err, profile);
        // });

        // Чтобы завершить процесс аутентификации необходимо вызвать `done`
        // и передать туда профиль пользователя – исходный или дополненный из базы
        done(null, profile)

        // Чтобы отменить аутентификацию отправляем false
        // done(null, false)
    }
);

export {githubStrategy}