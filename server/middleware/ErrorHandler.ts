// @ts-ignore
import {Logger} from "../services/Logger";
import {ExpressErrorMiddlewareInterface, HttpError, Middleware} from 'routing-controllers';

// @ts-ignore
export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    Logger.error('Server error', {stack: err})
    res.status(500).send(err)
}

@Middleware({type: 'after'})
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err: any) => any) {
        console.log(JSON.stringify(error))
        try {
            throw error
        } catch (err) {
            // @ts-ignore
            Logger.error('Server error', {error: {stack: err.stack}})
        }
        if (error instanceof HttpError) {
            response.status(error.httpCode).json(error);
        }
        next(error);
    }
}