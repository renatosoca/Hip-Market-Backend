import { Router } from 'express';
import { check } from 'express-validator';
import { revalidateAuth, userAuth, userRegister } from '../controllers';
import { checkSession, fieldValidations } from '../middlewares';

const router = Router();

router.post('/login', [
  check('email', 'El correo electrónico no es válido').not().isEmpty().isEmail().escape(),
  check('password', 'La contraseña es obligatoria').not().isEmpty().escape(),
  fieldValidations,
], userAuth);

router.post('/register', [
  check('name', 'El nombre es obligatorio').not().isEmpty().escape(),
  check('lastname', 'El apellido es obligatorio').not().isEmpty().escape(),
  check('email', 'El correo electrónico no es válido').not().isEmpty().isEmail().escape(),
  check('password', 'La contraseña es obligatoria').not().isEmpty().escape(),
  fieldValidations,
], userRegister);

router.use(checkSession);

router.get('/revalidate-auth', revalidateAuth);

export default router;