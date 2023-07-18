import { Router } from "express";
import { getGroupsController } from "../controllers/groups/get-groups.controller";
import { createGroupController } from "../controllers/groups/create-group.controller";

export let groupRouter = Router();

groupRouter.get("/", getGroupsController);
groupRouter.post("/", createGroupController);

