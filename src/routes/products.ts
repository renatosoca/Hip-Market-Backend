/* URL: http://localhost:4000/api/products */
import { Router } from 'express';
import { getProduct, getProducts, searchProducts } from '../controllers';

const router = Router();

router.get('/', getProducts );
router.get('/:slug', getProduct );
router.get('/search/:query', searchProducts );

export default router;