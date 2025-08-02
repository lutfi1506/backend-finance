import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../errors/appErrors";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        next(new ValidationError("Invalid Input", errorDetails));
      } else {
        next(error);
      }
    }
  };
