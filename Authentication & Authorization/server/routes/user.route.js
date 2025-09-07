import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { VerifyToken } from '../middleware/verifyToken.js';

export const UserRoute = express.Router();

UserRoute.post('/api/create', createUser);
UserRoute.post('/api/login', loginUser);
UserRoute.post('/api/logout', VerifyToken , logoutUser);