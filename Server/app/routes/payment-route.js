import express from "express";
import * as paymentController from '../controllers/payment-controller.js';

const router = express.Router();

router.route('/')
    .get(paymentController.getClientToken)
    .post(paymentController.processPayment);

export default router;