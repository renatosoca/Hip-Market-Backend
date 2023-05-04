/* URL: http://localhost:4000/api/products */
import { Router } from 'express';
import { getAllProductsSlugs, getProduct, getAllProducts, searchProducts } from '../controllers';

const router = Router();

router.get('/', getAllProducts);
router.get('/slugs', getAllProductsSlugs);
router.get('/:slug', getProduct);
router.get('/search/:query', searchProducts);

export default router;