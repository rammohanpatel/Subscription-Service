import express from 'express'
import { getAllUsers, getUser } from '../controllers/user.controller.js';
import checkUser from '../middlewares/checkUser.middleware.js';

const router = express.Router();

router.get('/allUsers',getAllUsers);
router.get('/user/:id',checkUser,getUser);

export default router