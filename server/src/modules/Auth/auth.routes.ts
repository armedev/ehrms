import { Router } from 'express';
import AuthController from './auth.controller';
import verify from '../../core/middleware/verify';

const router = Router();
router.post('/login', AuthController.login);
router.post('/change-password', verify, AuthController.changePassword);

export default router;
