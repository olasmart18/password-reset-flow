import express from 'express';
import { emailLink, resetPassword } from '../controllers/pwdResetController.js';

const router = express.Router();

router.post('/api/auth/resetpassword', emailLink);
router.put('/api/auth/password-reset/:token/:userId', resetPassword);

export default router;