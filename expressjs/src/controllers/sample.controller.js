import { sampleModel } from '#Models/sample.model.js';
import {
  createSampleSchema,
  getSampleByIDSchema,
  updateSampleByIDSchema,
} from '#Validators/sample.validator.js';

const fieldMap = ['title', 'description'];

const defProjectFilter = {
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
};

const fieldFilter = {};

const createSample = async (req, res) => {
  const { error } = createSampleSchema.validate(req.body);
  if (error) {
    const msg = error?.details?.[0]?.message || 'The values are not allowed';
    return res.status(404).send(msg);
  }
  const userData = req.body || { title: 'default data' };
  const newSample = new sampleModel(userData);
  await newSample.save();
  return res.status(201).send('Sample created successfully');
};

/* Read Documents */
const getAllSamples = async (req, res) => {
  const sampleDbData = await sampleModel.find({});
  return res.status(200).send(sampleDbData);
};

const getSampleById = async (req, res) => {
  const { error } = getSampleByIDSchema.validate(req.params);
  if (error) {
    const msg = error?.details?.[0]?.message || 'The values are not allowed';
    return res.status(404).send(msg);
  }
  const sampleId = req.params.sampleId;
  const sampleDbData = await sampleModel.findOne({ _id: sampleId }).exec();
  return res.status(200).send(sampleDbData);
};

const updateSample = async (req, res) => {
  const { body, query } = req;
  const { error } = updateSampleByIDSchema.validate({ body, query });
  if (error) {
    const msg = error?.details?.[0]?.message || 'The values are not allowed';
    return res.status(404).send(msg);
  }
  const sampleId = req.query.sampleId;
  const sampleData = req.body || { title: 'update dummy data' };
  const resp = await sampleModel.findByIdAndUpdate(sampleId, sampleData);

  return res.status(200).send('Sample updated successfully');
};

const deleteSample = async (req, res) => {
  const { error } = getSampleByIDSchema.validate(req.params);
  if (error) {
    const msg = error?.details?.[0]?.message || 'The values are not allowed';
    return res.status(404).send(msg);
  }
  const sampleId = req.params.sampleId;
  await sampleModel.deleteOne({ _id: sampleId });
  return res.status(200).send('Sample deleted successfully');
};

export {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
};
