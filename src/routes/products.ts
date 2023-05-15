/* URL: http://localhost:4000/api/products */
import { Router } from 'express';
import { getAllProductsSlugs, getProduct, getAllProducts, searchProducts, createProduct, updatedProduct } from '../controllers';

const router = Router();

router.get('/', getAllProducts);
router.get('/slugs', getAllProductsSlugs);
router.get('/:slug', getProduct);
router.get('/search/:query', searchProducts);

router.post('/create', createProduct);

router.put('/product/:id', updatedProduct);

export default router;