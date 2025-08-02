import { NextFunction, Request, Response } from "express";
import z, { ZodSchema } from "zod";
import { responseError } from "../utils/response";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return responseError(res, 400, "Invalid input", errors);
    }
    next();
  };
