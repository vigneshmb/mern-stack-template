import Joi from 'joi';

export const registerUserSchema = Joi.object({
  firstName: Joi.string().required().label('First Name'),
  middleName: Joi.string().optional().label('Middle Name'),
  lastName: Joi.string().optional().label('Last Name'),
  dob: Joi.string().required().label('Date of Birth'),
  email: Joi.string().required().label('Email ID'),
  username: Joi.string().required().label('Username'),
  password: Joi.string().required().label('Password'),
});

export const loginUserSchema = Joi.object({
  emailUsername: Joi.alternatives()
    .try(Joi.string().email(), Joi.string().alphanum().min(3).max(32))
    .required()
    .label('Email ID/Username'),
  password: Joi.string().required().label('Password'),
});

export const changeResetPasswordSchema = Joi.object({
  emailUsername: Joi.alternatives()
    .try(Joi.string().email(), Joi.string().alphanum().min(3).max(32))
    .required()
    .label('Email ID/Username'),
  password: Joi.string().required().label('Password'),
  newPassword: Joi.string().optional().label('Password'),
});
