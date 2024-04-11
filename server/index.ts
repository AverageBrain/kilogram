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
import { ChatController } from "./controllers/ChatController";
import connect_pg_simple from "connect-pg-simple";
import cors from "cors";
import passport from "passport";

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


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cookieParser());


app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000}, // 24 hours
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
        UserController,
        ChatController,
    ],
    middlewares: [
        LoggerMiddleware,
    ]
})


app.get(
    '/api/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    (req, res) => res.sendStatus(200)
);


console.log("Server started")
app.listen(3001);