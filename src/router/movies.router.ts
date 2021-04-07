import { Router } from 'express';
import MoviesController from '../controller/movies.controller';
import { verifyToken } from '../lib/verifyToken';

const router: Router = Router();

router.get('', verifyToken, MoviesController.getFilmsByPage);

export default router;