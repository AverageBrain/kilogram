/* eslint-disable @typescript-eslint/ban-types */
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: any, next?: Function): any {
    console.warn(`${request.method} ${request.url}`);
    if (next) next();
  }
}
