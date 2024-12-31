import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addAddress } from '../controllers/addAddress.js';
import { addessbyfilters } from '../controllers/addessbyfilters.js';

const router = express.Router();

router.post('/add',auth, addAddress);
router.post('/',auth, addessbyfilters);

  
export default router;