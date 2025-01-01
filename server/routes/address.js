import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addAddress } from '../controllers/addAddress.js';
import { addessbyfilters } from '../controllers/addessbyfilters.js';
import { deleteAddress } from '../controllers/deleteAddress.js';
import { updateAddress } from '../controllers/updateAddress.js';

const router = express.Router();

router.post('/',auth, addessbyfilters);
router.post('/add',auth, addAddress);
router.post('/update',auth,updateAddress)
router.delete('/delete',auth,deleteAddress)

  
export default router;