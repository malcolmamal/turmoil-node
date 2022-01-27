import express from 'express';
import { addUser, createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/add', addUser);
router.put('/create', createUser);
router.post('/login', loginUser);

export default router;
