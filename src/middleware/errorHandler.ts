// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { responseError } from "../utils/response";
import { AppError, ValidationError } from "../errors/appErrors"; // Impor

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Jika error adalah instance dari ValidationError, ia punya properti 'errors'
  if (err instanceof ValidationError) {
    return responseError(res, err.statusCode, err.message, err.errors);
  }

  // Untuk semua error kustom lainnya yang merupakan turunan AppError
  if (err instanceof AppError) {
    return responseError(res, err.statusCode, err.message, null);
  }

  // Untuk error tak terduga (bukan instance dari AppError)
  console.error("UNHANDLED ERROR:", err); // Penting untuk logging
  return responseError(res, 500, "Internal Server Error", null);
};
