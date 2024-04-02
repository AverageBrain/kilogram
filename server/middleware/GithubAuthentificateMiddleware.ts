import {ExpressMiddlewareInterface, UnauthorizedError} from "routing-controllers";
import passport from "passport";

export class GithubAuthenticate implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next?: (err?: any) => any): any {
        passport.authenticate("github")(req, res, next);
    }
}

export class GithubAuthentication implements ExpressMiddlewareInterface {
    authenticate = (callback: passport.AuthenticateCallback | ((...args: any[]) => any) | undefined) => passport.authenticate("github", {
        failureRedirect: "/",
        session: false
    }, callback);

    use(req: Request, res: Response, next: (err?: any) => any): any {
        return this.authenticate((err: any, user: any, info: any) => {
            if (err || !user) {
                return next(new UnauthorizedError(info));
            }
            return next();
        })(req, res, next);
    }
}