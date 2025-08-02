import { Router } from "express";
import { validate } from "../middleware/validation";
import { loginSchema, registerSchema } from "../validators/authValidator";
import { register, login } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
