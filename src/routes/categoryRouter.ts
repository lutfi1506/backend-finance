import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createNewCategory,
  getAllCategory,
  updatedCategory,
} from "../controllers/categoryController";
import { validate } from "../middleware/validation";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/categoryValidator";
import { protect } from "../middleware/authMiddleware";

const router = Router();
router.use(protect);

router
  .route("/")
  .post(validate(createCategorySchema), asyncHandler(createNewCategory))
  .get(asyncHandler(getAllCategory));

router
  .route("/:id")
  .put(validate(updateCategorySchema), asyncHandler(updatedCategory));

export default router;
