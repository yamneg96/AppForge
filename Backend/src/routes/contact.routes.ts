import { Router } from "express";
import {
  getContacts,
  createContact,
  markAsRead,
  deleteContact,
} from "../controllers/contact.controller.js";
import { authenticateAdmin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validation.js";
import { createContactSchema } from "../schemas/validation.js";

const router = Router();

// Public routes
router.post("/", validateRequest(createContactSchema), createContact);

// Protected routes (admin only)
router.get("/", authenticateAdmin, getContacts);
router.put("/:id", authenticateAdmin, markAsRead);
router.delete("/:id", authenticateAdmin, deleteContact);

export default router;
