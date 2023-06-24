import express from "express";

import { register, login } from '../controllers/userCoontroller.js'

const router = express.Router();

router.post('/user/register', register);
router.post('/user/login', login);

export default router;