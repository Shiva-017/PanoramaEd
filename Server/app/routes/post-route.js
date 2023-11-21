import express from 'express';

import * as postController from '../controllers/post-controller.js'

const router = express.Router();

router.route('/')
    .get(postController.show)
    .post(postController.post);

router.route('/:id')
    .delete(postController.remove);

    export default router;
