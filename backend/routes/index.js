import { Hono } from 'hono';
import { register } from '../controllers/RegisterController.js';
import { login } from '../controllers/LoginController.js';
import { findUsers, createUser, findUserById, updateUser, deleteUser } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/auth.js';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema, userSchema } from '../utils/validators/user.js';

export const api = new Hono();

api.post('/register', zValidator('json', registerSchema), register);
api.post('/login', zValidator('json', loginSchema), login);

api.get('/admin/users', verifyToken, findUsers);
api.post('/admin/users', verifyToken, zValidator('json', userSchema), createUser);
api.get('/admin/users/:id', verifyToken, findUserById);
api.put('/admin/users/:id', verifyToken, zValidator('json', userSchema), updateUser);
api.delete('/admin/users/:id', verifyToken, deleteUser);
