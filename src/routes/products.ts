import { Router } from 'express';
import { getProducts } from '../controllers';

const router = Router();

router.get('/', getProducts );

export default router;