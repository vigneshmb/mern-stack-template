import { userModel } from '#Models/user.model.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '#Validators/user.validator.js';

const defProjectFilter = {
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
};

const fieldFilter = {
  isDisabled: false,
  isDeleted: false,
};

const registerUser = async (req, res) => {
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      const msg = error?.details?.[0]?.message || 'The values are not allowed';
      return res.status(404).send(msg);
    }
    const userEmail = req.body.email;
    const dbData = await userModel.find({...fieldFilter,email:userEmail});
    if(dbData && dbData.length>0){
      return res.status(404).send("Email already registered");
    }

    const userData = req.body;
    const newUser = new sampleModel(userData);
    await newUser.save();
    return res.status(201).send('User created successfully');
  } catch (error) {
    return res.status(500).send("something went wrong. try again later");
  }
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
