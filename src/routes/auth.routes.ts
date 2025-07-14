import { Router } from "express";
import { signupController, signinController } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signupController);
router.post("/google", signupController);
router.post("/signin", signinController);

export default router;