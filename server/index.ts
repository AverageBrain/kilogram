import cookieParser from "cookie-parser";
import expressSession from "express-session";

import {myPassport} from "./passport/myPassport";
import {createExpressServer} from "routing-controllers";
import "reflect-metadata"
import {UserController} from "./controllers/UserController";


declare global {
    namespace Express {
        interface User {
            id: number
        }
    }
}

const app = createExpressServer({
    routePrefix: '/api',
    controllers: [
        UserController
    ]
});

app.use(cookieParser());

app.use(expressSession({
    secret: 'kjasndjkasndkjasndkjasndkasd' as string,
    resave: false,
    saveUninitialized: false,
}));

app.use(myPassport.initialize());
app.use(myPassport.session());

app.listen(3000);
