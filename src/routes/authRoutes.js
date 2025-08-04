import { Router } from "express";
import { register, login, logout, profile, getProfile, updateProfile } from "../controllers/authController.js";
import {verifyAndCompare} from '../controllers/verifyController.js'
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";
import { validateSchema, validateIdProfileSchema } from "../middlewares/validatorMiddleware.js";
import {registerSchema, loginSchema, updateProfileSchema, profileIdSchema } from "../validators/authValidator.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.get("/verify", verifyAndCompare)

router.get("/profile", verifyTokenMiddleware, profile)
router.get("/profile/:id", verifyTokenMiddleware, validateIdProfileSchema(profileIdSchema), getProfile);
router.patch("/profile/:id", verifyTokenMiddleware, validateIdProfileSchema(profileIdSchema), validateSchema(updateProfileSchema), updateProfile);

export default router;
