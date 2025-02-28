import { Router } from 'express';

import { loginUser, logoutUser, registerUser } from '#Controllers/user.controller.js';
import userAuthCheck from '#Middlewares/userAuth.js';

const userRouter = Router();
const baseRouter = Router();

/* Add Routes */
baseRouter.post('/register', registerUser);
baseRouter.post('/login', loginUser);
baseRouter.post('/logout', userAuthCheck, logoutUser);
// baseRouter.get('/getAll', getAllSamples);
// baseRouter.get('/get/:sampleId', getSampleById);
// baseRouter.put('/update', updateSample);
// baseRouter.delete('/delete/:sampleId', deleteSample);

/* Add Middlewares */
userRouter.use('/users', baseRouter);

export default userRouter;
