import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addAddress } from '../controllers/addAddress.js';


const router = express.Router();

router.post('/add',auth, addAddress);

  
export default router;