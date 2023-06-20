import express from "express";

import { createUser } from '../controllers/userCoontroller.js'

const router = express.Router();

router.post('/user/register', createUser)
export default router;