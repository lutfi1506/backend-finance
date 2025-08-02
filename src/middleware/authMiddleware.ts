import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { UnauthorizedError } from "../errors/appErrors";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string | null;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      throw new UnauthorizedError("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (!user) {
      throw new UnauthorizedError(
        "Not authorized, user for this token no longer exist"
      );
    }
    req.user = user;
    next();
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else {
      next(new UnauthorizedError("Not authorized, token failed or expired"));
    }
  }
};
