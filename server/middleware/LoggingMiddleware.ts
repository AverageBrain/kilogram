import {ExpressMiddlewareInterface, HttpError, Middleware} from "routing-controllers";
import {Logger} from "../services/Logger";

@Middleware({type: 'before'})
export class LoggerMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: any, next?: Function): any {
        Logger.info("Request", {method: request.method, url: request.url})
        if (next) next();
    }
}