import "reflect-metadata"
import cookieParser from "cookie-parser";
import expressSession from "express-session";

import {useExpressServer} from "routing-controllers";
import {UserController} from "./controllers/UserController";
import {myPassport} from "./passport/myPassport";
import {LoggerMiddleware} from "./middleware/LoggingMiddleware";
import express from "express";
import {User as PrismaUser} from "@prisma/client";
import {AuthController} from "./controllers/AuthController";
import connect_pg_simple from "connect-pg-simple";

const pgSession = connect_pg_simple(expressSession)

declare global {
    namespace Express {
        interface User {
            userId: number
            prismaUser: PrismaUser | null
        }
    }
}

const app = express();

app.use(cookieParser());


app.use(expressSession({
    secret: 'aklsdnkasjndlksandlksand',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
    name: "SID",
    store: new pgSession({
        conString: "postgresql://kilogram:kilogram@158.160.118.181:5432/kilogram",
        tableName: 'ExpressSession',
    })
}));

app.use(myPassport.initialize());
app.use(myPassport.session());

useExpressServer(app, {
    routePrefix: '/api',
    controllers: [
        AuthController,
        UserController
    ],
    middlewares: [
        LoggerMiddleware,
    ]
})

app.get(
    '/',
    (req, res) => res.sendStatus(200)
)
app.get(
    '/api',
    (req, res) => res.sendStatus(200)
)
app.listen(3001);