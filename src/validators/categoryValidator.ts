import z from "zod";

const transactionType = z.enum(["income", "expense"]);

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),
    type: transactionType,
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid category ID"),
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .optional(),
    type: transactionType.optional(),
  }),
});
