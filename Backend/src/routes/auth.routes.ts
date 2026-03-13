import { Router } from "express";
import {
  requestAdminOTP,
  verifyAdminOTP,
  verifyAdminGoogle,
  adminLogout,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { loginRequestSchema, verifyOTPSchema } from "../schemas/validation.js";

const router = Router();

// Public routes
router.post(
  "/request-otp",
  validateRequest(loginRequestSchema),
  requestAdminOTP,
);

router.post("/verify-otp", validateRequest(verifyOTPSchema), verifyAdminOTP);

router.post("/verify-google", verifyAdminGoogle);

// Protected routes
router.get("/me", authenticateAdmin, getCurrentAdmin);
router.post("/logout", authenticateAdmin, adminLogout);

export default router;
