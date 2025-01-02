import express from 'express'
import { AdminController } from '../controllers/adminController'

const router = express.Router();

router.post('/login', AdminController.login);
router.get('/users',AdminController.GetUsers);

export default router