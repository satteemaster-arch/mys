import express from 'express';
import { createUser, getUsers, getUserById, deleteUser, updateUser } from './UserController';

const router = express.Router();

// create
router.post('/users', createUser);

// get all
router.get('/users', getUsers);

// get
router.get('/users/:id', getUserById);

// delete
router.delete('/users/:id', deleteUser);

// update
router.put('/users/:id', updateUser);

export default router;
