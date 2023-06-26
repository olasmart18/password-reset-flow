import express from "express";

import {
    register,
    login,
    home
} from '../controllers/userCoontroller.js';
import verify from '../utils/verify.js';

const router = express.Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/home', verify, home)

export default router;