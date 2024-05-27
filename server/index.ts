/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable react-hooks/rules-of-hooks */
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import { useExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { myPassport } from './passport/myPassport';
import { LoggerMiddleware } from './middleware/LoggingMiddleware';
import express from 'express';
import { User as PrismaUser } from '@prisma/client';
import { AuthController } from './controllers/AuthController';
import { ChatController } from './controllers/ChatController';
import connect_pg_simple from 'connect-pg-simple';
import cors from 'cors';
import passport from 'passport';
import { SSEService } from './services/SSEService';
import { DelayMessageJob } from './job/DelayMessageJob';
import fileUpload from 'express-fileupload';
import { errorHandler } from './middleware/ErrorHandler';

const pgSession = connect_pg_simple(expressSession);

declare global {
  namespace Express {
    interface User {
      userId: number;
      prismaUser: PrismaUser | null;
    }
  }
}

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(cookieParser());

app.use(fileUpload({
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  abortOnLimit: true,
}));

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  name: 'SID',
  store: new pgSession({
    conString: 'postgresql://kilogram:kilogram@158.160.118.181:5432/kilogram',
    tableName: 'ExpressSession',
  }),
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
  ],
});

app.get(
  '/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/'),
);

app.use(errorHandler);

const sseService = new SSEService();
app.get('/api/user/sse', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Content-Encoding': 'none',
  });
  res.flushHeaders();

  const userId = req.user?.prismaUser?.id;
  if (userId == undefined) {
    throw new Error('User must be authorized');
  }
  const callback = (data: string) => res.write(`data: ${data}\n\n`);

  const listenId = sseService.registerListen(userId, callback);

  res.on('close', async () => {
    await sseService.unregisterListen(userId, await listenId);
    res.end();
  });
});

new DelayMessageJob().run();

// new PushNotificationService().send("eMilM8tFAkTHc3vyDsp2cR:APA91bESepHpZBGnv5tuE6D326eLG140BNW__EcQwyXtWarY7xyRzUY1fS_MqAxcP0Ox3mehTZ1tWp-dBqr--Upy42gGe_GAanRpGiO9RQiTZgFVQwS8EepIfbW_CbR87AwR21JR92-s", "Hihihihihi")
// new PushNotificationService().send("d1f-PcbzGockAJV7aMcn-q:APA91bE4uA86R6cq45RkNShCFQoUHLJ55AnvDEckggk6x0REbNvOaxDeabQnm0EAe8KvYhwB0r-iDBeUBOuQ_zboo4O6KUWkMv_kjV6mru4JI9_oG1BevGLN1_qP-rNS19bLyH0DmIk2", "Hihihihihi")

console.log('Server started');
// app.listen(3000);
// FIXME: develop
app.listen(3002);
