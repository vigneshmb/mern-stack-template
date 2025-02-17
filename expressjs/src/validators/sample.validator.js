import Joi from 'joi';

export const createSampleSchema = Joi.object({
  title: Joi.string().required().label('Title'),
  description: Joi.string().optional(),
});

export const getSampleByIDSchema = Joi.object({
  sampleId: Joi.string().hex().length(24).required(),
});

export const updateSampleByIDSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required().label('Saranya'),
    description: Joi.string().optional(),
  }),
  query: Joi.object({
    sampleId: Joi.string().hex().length(24).required(),
  }),
});
