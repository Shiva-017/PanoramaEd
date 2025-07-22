import express from 'express';
import * as postController from '../controllers/post-controller.js';

const router = express.Router();

router.route('/')
    .get(postController.show)
    .post(postController.post);

router.route('/:id')
    .get(postController.getById)           
    .delete(postController.remove)
    .patch(postController.update);         


router.route('/:id/like')
    .post(postController.toggleLike)       
    .patch(postController.toggleLike);  

router.route('/:id/view')
    .patch(postController.incrementView);


router.route('/:id/analytics')
    .get(postController.getPostAnalytics);

export default router;