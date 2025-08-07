import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getUserCreateions } from '../controllers/userController.js';
import { getPublishedCreations } from '../controllers/userController.js';
import { toogleLikeCreation } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('get-user-creations',auth,getUserCreateions);
userRouter.get('get-published-creations',auth,getPublishedCreations);
userRouter.post('/toggle-like-creation', auth, toogleLikeCreation);

export default userRouter;