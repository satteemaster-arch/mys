import express from 'express';
import { createUser, getUsers, getUserById, deleteUser, updateUser, login } from './UserController';

const router = express.Router();

// login
router.post('/login', login);

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
