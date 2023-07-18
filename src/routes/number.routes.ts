import { Router } from "express";
import { mustBeAdminMiddleware } from "../middlewares/must-be-admin.middleware";
import { createNumberController } from "../controllers/number/create-number.controller";
import { getNumbersController } from "../controllers/number/get-numbers.controller";

export let numberRouter = Router();

numberRouter.post("/", mustBeAdminMiddleware, createNumberController);
numberRouter.get("/", getNumbersController);