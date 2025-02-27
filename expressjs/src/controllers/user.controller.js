import { userModel } from '#Models/user.model.js';
import { generateHash } from '#Utils/bcryptUtils.js';
import { populateJoiMessage } from '#Utils/joiUtils.js';
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
      const msg = populateJoiMessage(error);
      return res.status(404).send(msg);
    }
    const userEmail = req.body.email;
    const dbData = getUserByEmail(userEmail);
    if (dbData && dbData.length > 0) {
      return res.status(404).send('Email already registered');
    }

    let userData = req.body;
    let hashPwd = generateHash(userData?.password);
    userData = {
      ...userData,
      password: hashPwd,
    };

    const newUser = new userModel(userData);
    await newUser.save();
    return res.status(201).send('User created successfully');
  } catch (error) {
    return res.status(500).send('something went wrong. try again later');
  }
};

const getUserByEmail = async (email) => {
  const dbData = await userModel.find({ ...fieldFilter, email });
  return dbData;
};


export {
  registerUser,  
};
