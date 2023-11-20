import express from "express";
import * as collegeController from "../controllers/college-controller.js";
const router = express.Router();

router.route('/')
    .get(collegeController.find)
    .post(collegeController.post)

router.route('/:id')
    .put(collegeController.updateEvents)
    .delete(collegeController.remove)
    .get(collegeController.findById)

router.route('/:id/:title')
    .put(collegeController.removeEvent)

export default router;