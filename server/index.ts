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
import {ChatController} from "./controllers/ChatController";
import connect_pg_simple from "connect-pg-simple";
import cors from "cors";
import passport from "passport";
import {SSEService} from "./services/SSEService";
import {DelayMessageJob} from "./job/DelayMessageJob";
// import fileUpload from "express-fileupload";
import {errorHandler} from "./middleware/ErrorHandler";

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
// app.use(fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
// }));


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
    (req, res) => res.redirect('/')
);

const sseService = new SSEService()
app.get("/api/user/sse", (req, res) => {
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
    });

    const userId = req.user?.prismaUser?.id
    if (userId == undefined) {
        throw new Error("User must be authorized")
    }
    const callback = (data: string) => res.write(`data: ${data}\n\n`);

    const listenId = sseService.registerListen(userId, callback)

    res.on("close", () => {
        sseService.unregisterListen(userId, listenId)
        res.end();
    });
});

new DelayMessageJob().run()

console.log("Server started")
app.listen(3002);