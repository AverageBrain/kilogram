import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";

import {routers} from "./routes";
import {myPassport} from "./myPassport";

const app = express();

app.use(cookieParser());

app.use(expressSession({
    secret: 'kjasndjkasndkjasndkjasndkasd' as string,
    resave: false,
    saveUninitialized: false,
}));

app.use(myPassport.initialize());

app.use(myPassport.session());

app.use(routers);

app.listen(3000);
