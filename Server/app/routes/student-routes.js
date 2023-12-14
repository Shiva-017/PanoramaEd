import express from "express";
import * as studentController from "../controllers/student-controller.js";

// Creating an Express router
const router = express.Router();

// Routes for handling CRUD operations on students
router.route('/')
    .get(studentController.find)
    .post(studentController.post)

router.route('/:id')
    .delete(studentController.remove)
    .get(studentController.findByEmail)
    .patch(studentController.update);

    // Exporting the configured Express router

export default router;