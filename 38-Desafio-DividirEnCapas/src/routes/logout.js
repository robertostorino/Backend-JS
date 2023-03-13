import { Router } from 'express';
import controller from '../controllers/logout.js';

const router = Router();

router.get('/logout', controller.logout);

export default router;