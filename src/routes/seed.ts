import { Router } from 'express';
import { seed } from '../controllers';

const router = Router();

router.get('/', seed );

export default router;