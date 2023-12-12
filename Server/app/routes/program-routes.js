import express from "express";
import * as programController from "../controllers/program-controller.js";
const router = express.Router();


// router.route('/:id')
//     .get(programController.findById)

router.route('/suggest')
    .post(programController.findByMetrics)

router.route('/')
    .get(programController.find)

router.route('/')


export default router;