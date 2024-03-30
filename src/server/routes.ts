import {isAuthenticatedMiddleware} from "./controllers/isAuthenticatedMiddleware";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {Router} from "express";
import passport from "passport";

const routers = Router();

// Главная страница
routers.get(
    '/',
    (req: Request, res: Response) => res.render('main', {user: req.user})
);

// Маршрут для входа
routers.get(
    '/auth/github',
    // Аутентифицируем пользователя через стратегию GitHub
    // Если не удается, отправляем код 401
    passport.authenticate('github')
);

// Маршрут, на который пользователь будет возвращён после авторизации на GitHub
routers.get(
    '/auth/github/callback',
    // Заканчиваем аутентифицировать пользователя
    // Если не удачно, то отправляем на /
    passport.authenticate('github', {failureRedirect: '/'}),
    (req, res) => res.redirect('/')
);

// Маршрут для просмотра профиля пользователя
routers.get(
    '/profile',
    // Если пользователь не аутентифицирован, то отправляем на /
    isAuthenticatedMiddleware,
    // Иначе показываем его профиль
    (req: Request, res: Response) => res.render('user', {user: req.user})
);

// Маршрут для выхода пользователя
routers.get(
    '/logout',
    (req: Request, res: Response, next: NextFunction) => {
        // Удаляем сессию пользователя из хранилища
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            // И отправляем на /
            res.redirect('/');
        });
    }
);

export {routers}