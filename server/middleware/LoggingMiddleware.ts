import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";

@Middleware({type: 'before'})
export class LoggerMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: any, next?: Function): any {
        console.log(request.method + " " + request.url);
        if (next) next();
    }
}