import { Router } from 'express';

import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
} from '#Controllers/sample.controller.js';

const SampleRouter = Router();

SampleRouter.post('/create', createSample);
SampleRouter.get('/getAll', getAllSamples);
SampleRouter.get('/get/:sampleId', getSampleById);
SampleRouter.put('/update', updateSample);
SampleRouter.delete('/delete/:sampleId', deleteSample);

export default SampleRouter;
