import express from 'express';

import * as postController from '../controllers/post-controller.js'

const router = express.Router();
// route for show,post and remove
router.route('/')
    .get(postController.show)
    .post(postController.post);

router.route('/:id')
    .delete(postController.remove)
    .patch(postController.update);

    export default router;


