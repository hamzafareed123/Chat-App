import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllContacts } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getMessageByUserId } from "../controllers/message.controller.js";
import { getAllChats } from "../controllers/message.controller.js";
import { arcjetProtect } from "../middleware/arcjet.middleware.js";

const router = express.Router();


router.use(arcjetProtect,protectedRoute)

router.get("/contacts",getAllContacts);
router.get("/chats",getAllChats);
 router.get("/:id",getMessageByUserId);
router.post("/send/:id",sendMessage)

export default router;