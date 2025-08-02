import { Request, Response } from "express";
import { createUser, loginUser } from "../services/authService";
import { responseSuccess } from "../utils/response";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  const clearEmail = email?.toLowerCase().trim();
  const user = await createUser({
    email: clearEmail,
    password,
    name: name || "",
  });
  responseSuccess(res, 201, "user has created", user);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const clearEmail = email?.toLowerCase().trim();
  const user = await loginUser({ email: clearEmail, password });
  responseSuccess(res, 200, "user has logged in", user);
};
