import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import {
  createCategory,
  getCategoriesByUser,
  updateCategory,
} from "../services/categoryService";
import { responseSuccess } from "../utils/response";

export const createNewCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, type } = req.body;
  const userId = req.user?.id ?? "";
  const category = await createCategory(userId, { name, type });
  responseSuccess(res, 201, "Category created successfully", category);
};

export const getAllCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id ?? "";
  const categories = await getCategoriesByUser(userId);
  responseSuccess(res, 200, "Categories fetched successfully", categories);
};

export const updatedCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, type } = req.body;
  const userId = req.user?.id ?? "";

  // Assuming there's a service function to update the category
  const updatedCategory = await updateCategory(userId, id, { name, type });
  responseSuccess(res, 200, "Category updated successfully", updatedCategory);
};
