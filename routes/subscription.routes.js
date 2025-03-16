import express from 'express'
import checkUser from '../middlewares/checkUser.middleware.js'
import { createSubscription } from '../controllers/subscription.controller.js';

const router = express.Router();

router.post('/subscription',checkUser,createSubscription)

export default router