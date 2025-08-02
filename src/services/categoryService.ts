import { prisma } from "../config/prisma";
import { ConflictError } from "../errors/appErrors";

interface CategoryData {
  name: string;
  type: "income" | "expense";
}

export const getCategoriesByUser = async (userId: string) => {
  const category = await prisma.category.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return category;
};

export const createCategory = async (userId: string, data: CategoryData) => {
  const { name, type } = data;
  const existingCategory = await prisma.category.findFirst({
    where: {
      userId,
      name,
    },
  });
  if (existingCategory) {
    throw new ConflictError(`Category with name '${name}' already exists`);
  }
  const category = await prisma.category.create({
    data: {
      name,
      type,
      userId,
    },
  });
  return category;
};
