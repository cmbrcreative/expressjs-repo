import { UnauthorizedError } from "express-jwt";
import { ValidationError } from "express-validation";
import { HttpError } from "src/errors/HttpError";
import { InvalidArgumentError } from "src/errors/InvalidArgumentError";
import { InvalidOperationError } from "src/errors/InvalidOperationError";
import { ObjectNotFoundError } from "src/errors/ObjectNotFoundError";
import { OperationNotPermittedError } from "src/errors/OperationNotPermittedError";
import logError from "src/utils/errorLogging";

export async function customErrorHandler(err, _req, res, _next) {
  const eventId = logError(err);

  // Adapt specific error types to HttpError
  if (err instanceof InvalidArgumentError) {
    err = new HttpError(400, err.toString());
  } else if (err instanceof ObjectNotFoundError) {
    err = new HttpError(404, err.message);
  } else if (err instanceof OperationNotPermittedError) {
    err = new HttpError(403, err.message);
  } else if (err instanceof InvalidOperationError) {
    err = new HttpError(422, err.message);
  } else if (err instanceof ValidationError) {
    err = new HttpError(400, "Invalid request", err.details);
  } else if (err instanceof UnauthorizedError) {
    err = new HttpError(401, "Unauthorized request");
  }

  if (err instanceof HttpError) {
    res.status(err.code).json(err.response);
  } else {
    res.status(500).end(eventId + "\n");
  }
}
