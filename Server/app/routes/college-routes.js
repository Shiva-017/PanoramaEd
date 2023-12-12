import express from "express";
import * as collegeController from "../controllers/college-controller.js";
const router = express.Router();

router.route('/')
    .get(collegeController.findByIds) // to fetch colleges by ids
    .post(collegeController.post) // adds a new college
    .put(collegeController.shortlistCollege) // to shortlist a college (two ways, add in student table and college table);

router.route('/removeShortlist')
    .put(collegeController.removeShortlistCollege) // remove college from shortlist (two ways)

router.route('/:id')
    .put(collegeController.updateEvents) // update events under a college
    .delete(collegeController.remove) // remove a college
    .get(collegeController.findById) // finding a college by id

router.route('/addPrograms/:id')
    .put(collegeController.addPrograms); // adds new programs into college

router.route('/deletePrograms/:id')
    .put(collegeController.deletePrograms); // deletes programs from college

router.route('/name/:name')
    .get(collegeController.findByName); // find a college by name

router.route('/:id/:title')
    .put(collegeController.removeEvent); // remove an event under college

export default router;