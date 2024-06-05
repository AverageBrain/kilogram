// @ts-expect-error error-Handler
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.warn(err.stack);
  res.status(500).send(err);
}
