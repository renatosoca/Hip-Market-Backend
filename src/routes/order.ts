import { Router } from 'express';
import { createOrder, getOrderById, getOrders, getOrdersByUser, payOrder } from '../controllers';
import { checkSession } from '../middlewares';

const router = Router();

router.use(checkSession);

router.route('/')
  .get(getOrdersByUser)
  .post(createOrder);

router.get('/all', getOrders)

router.get('/:id', getOrderById);

router.post('/pay-order', payOrder);

export default router;