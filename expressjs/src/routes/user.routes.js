import { Router } from 'express';

import { registerUser } from '#Controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
// SampleRouter.get('/getAll', getAllSamples);
// SampleRouter.get('/get/:sampleId', getSampleById);
// SampleRouter.put('/update', updateSample);
// SampleRouter.delete('/delete/:sampleId', deleteSample);

export default userRouter;
