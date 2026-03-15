import { Router } from "express";
import {
  getApps,
  getAppById,
  getAppBySlug,
  createApp,
  updateApp,
  deleteApp,
} from "../controllers/apps.controller.js";
import { uploadAppFiles } from "../middleware/upload.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { createAppSchema, updateAppSchema } from "../schemas/validation.js";

const router = Router();

// Public routes (read-only)
router.get("/", getApps);
router.get("/id/:id", getAppById);
router.get("/:slug", getAppBySlug);

// Protected routes (write operations)
router.post(
  "/",
  authenticateAdmin,
  uploadAppFiles,
  validateRequest(createAppSchema),
  createApp,
);

router.put(
  "/:id",
  authenticateAdmin,
  uploadAppFiles,
  validateRequest(updateAppSchema),
  updateApp,
);

router.delete("/:id", authenticateAdmin, deleteApp);

export default router;
