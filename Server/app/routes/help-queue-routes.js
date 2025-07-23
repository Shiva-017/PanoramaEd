import express from 'express';
import * as helpQueueController from '../controllers/help-queue-controller.js';

const router = express.Router();

// Get waiting students for mentors
router.route('/waiting')
    .get(helpQueueController.getWaitingStudents);

// Student request help
router.route('/request')
    .post(helpQueueController.requestHelp);

// Mentor accept help
router.route('/accept/:requestId')
    .post(helpQueueController.acceptHelp);

// Get student status
router.route('/status/:studentId')
    .get(helpQueueController.getStudentStatus);

export default router;
