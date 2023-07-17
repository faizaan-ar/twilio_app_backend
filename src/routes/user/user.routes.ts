import { Router } from "express";
import { registerController } from "../../controllers/user/register.controller";
import { signInController } from "../../controllers/user/signin.controller";
import { generateAccessTokenController } from "../../controllers/user/generate-access-token.controller";

export let userRouter = Router();


userRouter.post("/register", registerController);
userRouter.post("/signin", signInController);
userRouter.post("/generate_access_token", generateAccessTokenController)