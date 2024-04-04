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

const allowedOrigins = ['http://localhost:3000/']
const corsMiddleware = cors({
    // origin: function(origin, callback){
    //     if(!origin) return callback(null, true);
    //     if(allowedOrigins.indexOf(origin) === -1){
    //         const msg = 'The CORS policy for this site does not ' +
    //             'allow access from the specified Origin.';
    //         return callback(new Error(msg), false);
    //     }
    //     return callback(null, true);
    // },
    origin: 'http://localhost:3000/',
    credentials: true,
})

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

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
        // corsMiddleware,
        LoggerMiddleware,
    ]
})


app.get(
    '/api/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    (req, res) => res.sendStatus(200)
);

app.listen(3001);