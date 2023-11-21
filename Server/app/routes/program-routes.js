import express from "express";
import * as programController from "../controllers/program-controller.js";
const router = express.Router();

router.route('/')
    .get(programController.find)

router.route('/:id')
    .get(programController.findById)

export default router;