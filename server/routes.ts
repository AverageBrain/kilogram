import {isAuthenticatedMiddleware} from "./middleware/isAuthenticatedMiddleware";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {Router} from "express";
import passport from "passport";

const routers = Router();

routers.get(
    '/',
    (req: Request, res: Response) => {
        res.status(200).type('text/plain');
        res.send('Create user request');
    }
);

routers.get(
    '/auth/github',
    passport.authenticate('github')
);

routers.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    (req, res) => res.redirect('/')
);

routers.get(
    '/profile',
    isAuthenticatedMiddleware,
    (req: Request, res: Response) => {
        res.status(200).type('text/plain');
        res.send(req.user);
    }
);

routers.get(
    '/logout',
    (req: Request, res: Response, next: NextFunction) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
);

export {routers}