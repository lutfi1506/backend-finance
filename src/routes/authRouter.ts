import { Router } from "express";
import { validate } from "../middleware/validation";
import { registerSchema } from "../validators/authValidator";
import { register, login } from "../controllers/authController";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(registerSchema), login);

export default router;
