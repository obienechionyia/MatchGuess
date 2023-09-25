import { Router } from "express";
const router = Router();
import {
  getAllMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/matchController.js";
import { validateMatchInput } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

router
  .route("/")
  .get(getAllMatches)
  .post(checkForTestUser, validateMatchInput, createMatch);
router
  .route("/:id")
  .get(getMatch)
  .patch(checkForTestUser, validateMatchInput, updateMatch)
  .delete(checkForTestUser, deleteMatch);

export default router;
