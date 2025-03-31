import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required().label('Title'),
  description: Joi.string().optional(),
});

export const getTaskByIDSchema = Joi.object({
  taskId: Joi.string().hex().length(24).required(),
});

export const updateTaskByIDSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required().label('Title'),
    description: Joi.string().optional(),
  }),
  query: Joi.object({
    taskId: Joi.string().hex().length(24).required(),
  }),
});
