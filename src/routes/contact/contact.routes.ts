import { Router } from "express";
import { registerController } from "../../controllers/user/register.controller";
import { getContactsController } from "../../controllers/contact/get-contacts.controller";
import { createContactController } from "../../controllers/contact/create-contacts.controller";
import { updateContactController } from "../../controllers/contact/update-contact.controller";

export let contactRouter = Router();

contactRouter.get("/", getContactsController);
contactRouter.post("/", createContactController);
contactRouter.patch("/", updateContactController);