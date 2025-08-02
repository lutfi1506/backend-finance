import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { responseError } from "../utils/response";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    return responseError(res, 400, "Invalid input", errors);
  }
  if (err.name === "Conflict Error") {
    return responseError(res, 409, err.message, null);
  }

  if (err.name === "Authentication Error") {
    return responseError(res, 401, err.message, null);
  }

  console.error(err);
  return responseError(res, 500, "Internal Server Error", null);
};
