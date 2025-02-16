import { sampleModel } from '#Models/sample.model.js';
import { createSampleSchema } from '#Validators/sample.validator.js';

const projectFilter = {
  __v: 0,
};

const fieldFilter = {};

const createSample = (req, res) => {
  console.log(req.body)
  const {error} = createSampleSchema.validate(req.body)
  if(error) {
    res.status(404).send(error.details[0].message);
  }
  const userData = req.body || { title: 'default data' };
  const newSample = new sampleModel(userData);
  newSample.save();
  res.status(201).send('Sample created successfully');
};

/* Read Documents */
const getAllSamples = async (req, res) => {
  const SampleDbData = await sampleModel.find({});
  res.status(200).send(SampleDbData);
};

const getSampleById = async (req, res) => {
  // const SampleId = req.query.id;
  const SampleId = req.params.SampleId;
  const SampleDbData = await sampleModel.findOne({ _id: SampleId }).exec();
  res.status(200).send(SampleDbData);
};

const updateSample = async (req, res) => {
  const SampleId = req.query.id;
  const SampleData = req.body || { title: 'update dummy data' };
  console.log(SampleId, SampleData);
  const resp = await sampleModel.findByIdAndUpdate(SampleId, SampleData);
  console.log(resp);

  res.status(200).send('Sample updated successfully');
};

const deleteSample = async (req, res) => {
  const SampleId = req.params.id;
  await sampleModel.deleteOne({ _id: SampleId });
  res.status(200).send('Sample deleted successfully');
};

export {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
};
