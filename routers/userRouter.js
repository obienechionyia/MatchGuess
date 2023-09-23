import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  updateUser,
  getMatchStats,
} from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multerMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/match-stats", authorizePermissions("admin"), getMatchStats);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);
export default router;
