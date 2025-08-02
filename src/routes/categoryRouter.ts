import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createNewCategory,
  getAllCategory,
} from "../controllers/categoryController";
import { validate } from "../middleware/validation";
import { createCategorySchema } from "../validators/categoryValidator";
import { protect } from "../middleware/authMiddleware";

const router = Router();
router.use(protect);

router
  .route("/")
  .post(validate(createCategorySchema), asyncHandler(createNewCategory))
  .get(asyncHandler(getAllCategory));

export default router;
