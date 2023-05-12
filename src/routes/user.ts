import { Router } from "express";
import { getUsers, updateUser } from "../controllers";

const router = Router();

router.get('/all', getUsers);

router.put('/update', updateUser);

export default router;