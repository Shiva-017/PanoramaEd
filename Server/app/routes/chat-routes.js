import express from "express";
import * as chatController from "../controllers/chat-controller.js";
const router = express.Router();

router.route('/')
    .post(chatController.post)

export default router;