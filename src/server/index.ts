import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";

import {routers} from "./routes";
import {myPassport} from "./myPassport";

const app = express();

// Подключаем библиотеку для парсинга кук, чтобы получить доступ к сессионной куке
app.use(cookieParser());

// Подключаем библиотеку, чтобы управлять сессиями аутентифицированных пользователей.
app.use(expressSession({
    // Сессии содержат id сессии и данные пользователя
    // (или id пользователя, если данные хранятся в базе).
    //
    // Как только пользователь аутентифицируется, мы создаём его сессию с уникальным id.
    // кладём её в хранилище (по умолчанию, в память), связываем с данными пользователя.
    //
    // Затем подписываем сессию секретом и кладём в cookie `connect.sid`.
    //
    // При обновлении страницы, мы читаем cookie `connect.sid`,
    // получаем из неё id и смотрим, нет ли в хранилище существующей сессии.
    //
    // Если есть, то считаем пользователя уже аутентифицированным.

    // Секрет, для подписи сессионной cookie, чтобы её нельзя было подделать
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    // Указываем, нужно ли сохранять сессию, даже если она не была изменена
    resave: false,
    // Указываем, нужно ли сохранять новую, но не измененную сессию
    saveUninitialized: false,
    // Указываем хранилище (по умолчанию, в памяти)
    // store: new require('connect-mongo')(expressSession)(options)
}));

app.use(myPassport.initialize());

// Подключаем механизм сессий к Passport.js
app.use(myPassport.session());

app.use(routers);

app.listen(3000);