import { Router } from 'express';
import { createOrder, getOrderById, getOrdersByUser, payOrder } from '../controllers';

const router = Router();

//router.use(checkSession);

router.route('/')
  .get(getOrdersByUser)
  .post(createOrder);

router.get('/:id', getOrderById);

router.post('/pay-order', payOrder);

export default router;