import express from 'express'
import { CompanyController } from '../controllers/companyController';


const router = express.Router();

router.post('/register', CompanyController.register);
router.post('/verify-otp', CompanyController.verifyOtp);
router.post('/login', CompanyController.componyLogin)




export default router