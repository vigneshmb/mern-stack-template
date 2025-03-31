import { Router } from 'express';

import {
  registerUser,
  loginUser,
  logoutUser,
  changeResetPassword,
  getUserDetails,
} from '#Controllers/user.controller.js';
import userAuthCheck from '#Middlewares/userAuth.js';
import {
  getRouteLimiter,
  userRouteLimiter,
} from '#Middlewares/apiRateLimit.js';
import {
  getRouteSlowdown,
  userRouteSlowdown,
} from '#Middlewares/apiSlowDown.js';

const userRouter = Router();
const baseRouter = Router();

/* Add Routes */
baseRouter.post('/register', userRouteLimiter, userRouteSlowdown, registerUser);
baseRouter.post(
  '/login',
  getRouteLimiter(5, 'min', 5),
  getRouteSlowdown(5, 'min', 2, 1),
  loginUser,
);
baseRouter.get('/logout', userAuthCheck, logoutUser);
baseRouter.post(
  '/changePassword',
  getRouteLimiter(5, 'min', 5),
  getRouteSlowdown(5, 'min', 2, 1),
  userAuthCheck,
  changeResetPassword,
);
baseRouter.post(
  '/resetPassword',
  getRouteLimiter(5, 'min', 5),
  getRouteSlowdown(5, 'min', 2, 1),
  changeResetPassword,
);
baseRouter.get('/getMe',userAuthCheck, getUserDetails);

/* Add Middlewares */
userRouter.use('/users', baseRouter);

export default userRouter;
