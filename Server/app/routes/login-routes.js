import express from "express";
import * as loginController from "../controllers/login-controller.js";
const router = express.Router();

router.route('/')
    .get(loginController.fetch)
    .post(loginController.post)

export default router;