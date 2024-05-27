import { NextFunction, Request, Response } from 'express-serve-static-core';

const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
};

export { isAuthenticatedMiddleware };
