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

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route("/").get(getAllMatches).post(validateMatchInput, createMatch);
router
  .route("/:id")
  .get(getMatch)
  .patch(validateMatchInput, updateMatch)
  .delete(deleteMatch);

export default router;
