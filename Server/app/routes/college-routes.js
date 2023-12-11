import express from "express";
import * as collegeController from "../controllers/college-controller.js";
const router = express.Router();

router.route('/')
    .get(collegeController.find)
    .post((req, res) => {
        if (Object.keys(req.query).length > 0) {
            collegeController.shortlistCollege(req, res);
        } else {
            collegeController.post(req, res);
        }
    });

router.route('/removeShortlist')
    .post((req, res) => {
        if (Object.keys(req.query).length > 0) {
            collegeController.removeShortlistCollege(req, res);
        }
});

router.route('/:id')
    .put(collegeController.updateEvents)
    .delete(collegeController.remove)
    .get(collegeController.findById)

router.route('/name/:name')
    .get(collegeController.findByName);

router.route('/:id/:title')
    .put(collegeController.removeEvent);

export default router;