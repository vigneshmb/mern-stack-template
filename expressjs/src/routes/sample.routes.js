import { Router } from 'express';

import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
} from '#Controllers/sample.controller.js';
import userAuthCheck from '#Middlewares/userAuth.js';

const sampleRouter = Router();
const baseRouter = Router();

/* Add Routes */
baseRouter.post('/create', createSample);
baseRouter.get('/getAll', getAllSamples);
baseRouter.get('/get/:sampleId', getSampleById);
baseRouter.put('/update', updateSample);
baseRouter.delete('/delete/:sampleId', deleteSample);

/* Add Middlewares */
sampleRouter.use('/samples', userAuthCheck, baseRouter);

export default sampleRouter;
