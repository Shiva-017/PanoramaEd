import express from 'express';
import * as mentorController from '../controllers/mentor-controller.js';

const router = express.Router();

// Mentor authentication
router.route('/login')
    .post(mentorController.login);

// Mentor CRUD operations
router.route('/')
    .get(mentorController.fetch)
    .post(mentorController.post);

// Mentor status management
router.route('/:id/status')
    .patch(mentorController.updateStatus);

// Get available mentors
router.route('/available')
    .get(mentorController.getAvailable);

export default router;