import express from "express";
import * as chatController from "../controllers/chat-controller.js";
const router = express.Router();

router.route('/')
    .get(chatController.find)
    .post(chatController.post)

export default router;