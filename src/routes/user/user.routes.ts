import { Router } from "express";
import { registerController } from "../../controllers/user/register.controller";
import { signInController } from "../../controllers/user/signin.controller";

export let userRouter = Router();


userRouter.post("/register", registerController);
userRouter.post("/signin", signInController);