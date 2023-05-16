/* URL: http://localhost:4000/api/products */
import { Router } from 'express';
import { getAllProductsSlugs, getProduct, getAllProducts, searchProducts, createProduct, updatedProduct, uploadFiles, deleteFiles } from '../controllers';
import { uploadMulter } from '../middlewares';

const router = Router();

router.get('/', getAllProducts);
router.get('/slugs', getAllProductsSlugs);
router.get('/:slug', getProduct);
router.get('/search/:query', searchProducts);

router.post('/create', createProduct);

router.put('/product/:id', updatedProduct);

router.post('/upload/images', uploadMulter, uploadFiles);
router.post('/delete/images', deleteFiles);

export default router;