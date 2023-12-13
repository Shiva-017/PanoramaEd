import express from "express";
import * as studentController from "../controllers/student-controller.js";
const router = express.Router();

router.route('/')
    .get(studentController.find)
    .post(studentController.post)

router.route('/:id')
    .delete(studentController.remove)
    .get(studentController.findByEmail)

export default router;