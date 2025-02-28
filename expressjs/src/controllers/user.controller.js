import { userModel } from '#Models/user.model.js';
import { checkHash, generateHash } from '#Utils/bcryptUtils.js';
import { populateJoiMessage } from '#Utils/joiUtils.js';
import { createToken } from '#Utils/jwtUtils.js';
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
      return res.status(400).send(msg);
    }
    const userEmail = req.body.email;
    const dbData = await getUserByEmail(userEmail);
    if (dbData && Object.keys(dbData).length > 0) {
      return res.status(401).send('Email already registered');
    }

    let userData = req.body;
    let hashPwd = await generateHash(userData?.password);
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

const loginUser = async (req, res) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
      const msg = populateJoiMessage(error);
      return res.status(400).send(msg);
    }
    const userEmail = req.body.emailUsername;
    const dbData = await getUserByEmail(userEmail);

    if (!(dbData && Object.keys(dbData).length > 0)) {
      return res.status(401).send('Account is not registered');
    }

    let loginData = req.body;
    let passwdCheck = await checkHash(loginData?.password, dbData?.password);
    if (!passwdCheck) {
      return res.status(401).send('Password is wrong');
    }

    const {
      _id,
      isDeleted,
      isDisabled,
      createdAt,
      updatedAt,
      password,
      oldPasswords,
      jwtTokens,
      __v,
      ...remVals
    } = dbData;
    const tokenData = { ...remVals };
    const jwtToken = createToken(tokenData);

    let { jwtTokens: newTokens } = dbData;
    newTokens.push(jwtToken);
    newTokens.length > 5 && newTokens.shift();
    await userModel.findByIdAndUpdate(_id, { jwtTokens: newTokens });
    console.log('called login');

    res.setHeader('jwtToken', jwtToken);
    return res.status(200).send('Login successful');
  } catch (error) {
    console.log(error);

    return res.status(500).send('something went wrong. try again later');
  }
};

const getUserByEmail = async (email) => {
  const dbData = await userModel.find({ ...fieldFilter, email });
  return dbData?.[0] || {};
};

export { registerUser, loginUser };
