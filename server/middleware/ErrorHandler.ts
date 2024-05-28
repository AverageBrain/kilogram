/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(500).send(err);
}
