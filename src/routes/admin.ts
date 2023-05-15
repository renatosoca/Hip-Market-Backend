import { Router } from 'express';
import { getProducts, getDashboard } from '../controllers';

const router = Router();

router.get('/dashboard', getDashboard);

router.get('/products', getProducts);


export default router;