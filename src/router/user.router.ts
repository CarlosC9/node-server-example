import { Router } from 'express';
import UserController from '../controller/user.controller'

const router : Router = Router();

router.post('/signup', UserController.signUpUser);
router.post('/signin', UserController.signInUser);

export default router;