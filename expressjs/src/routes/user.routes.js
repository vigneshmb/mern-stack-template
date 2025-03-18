import { Router } from 'express';

import {
  loginUser,
  logoutUser,
  registerUser,
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
baseRouter.post('/logout', userAuthCheck, logoutUser);
// baseRouter.get('/getAll', getAllSamples);
// baseRouter.get('/get/:sampleId', getSampleById);
// baseRouter.put('/update', updateSample);
// baseRouter.delete('/delete/:sampleId', deleteSample);

/* Add Middlewares */
userRouter.use('/users', baseRouter);

export default userRouter;
