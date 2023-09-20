import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  updateUser,
  getMatchStats,
} from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleWare.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/match-stats", authorizePermissions("admin"), getMatchStats);
router.patch("/update-user", updateUser);
export default router;
