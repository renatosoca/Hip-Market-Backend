import { Router } from 'express';
import { createOrder } from '../controllers';

const router = Router();

router.post('/', createOrder)

export default router;