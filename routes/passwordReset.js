import express from 'express';
import { emailLink } from '../controllers/pwdResetController.js';

const router = express.Router();

router.post('/auth/resetpassword', emailLink);

export default router;