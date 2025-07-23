import express from "express";
import * as loginController from "../controllers/login-controller.js";
const router = express.Router();

router.route('/login')
    .get(loginController.fetch)
    .post(loginController.fetch)

router.route('/signup')
    .post(loginController.post)

export default router;