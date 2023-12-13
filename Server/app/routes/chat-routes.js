import express from "express";
import * as chatController from "../controllers/chat-controller.js";
const router = express.Router();

router.route('/')
    .get(chatController.show)
    .post(chatController.post)

router.route('/:id')
    .patch(chatController.update)

export default router;