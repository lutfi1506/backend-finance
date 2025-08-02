import z from "zod";

const transactionType = z.enum(["income", "expense"]);

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    type: transactionType,
  }),
});
