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
    let oldPasswords = [hashPwd];
    userData = {
      ...userData,
      password: hashPwd,
      oldPasswords,
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

    let {
      _id,
      firstName,
      middleName,
      lastName,
      dob,
      email,
      username,
      jwtTokens: newTokens,
    } = dbData;
    const jwtToken = createToken({
      firstName,
      middleName,
      lastName,
      dob,
      email,
      username,
    });

    newTokens.push(jwtToken);
    newTokens.length > 5 && newTokens.shift();
    await userModel.findByIdAndUpdate(_id, { jwtTokens: newTokens });

    res.setHeader('jwtToken', jwtToken);
    return res.status(200).send('Login successful');
  } catch (error) {
    console.log(error);

    return res.status(500).send('something went wrong. try again later');
  }
};

const logoutUser = async (req, res) => {
  try {
    let { email } = req?.userData;
    const dbData = await getUserByEmail(email);
    let { _id,jwtTokens } = dbData;
    const fullToken = req?.headers?.['authorization'] || null;
    const jwtToken = fullToken.split(' ')[1];

    let newTokens = jwtTokens.filter(token=>token !== jwtToken);
    await userModel.findByIdAndUpdate(_id, { jwtTokens: newTokens });
    return res.status(200).send('Logout successful');
  } catch (error) {
    return res.status(500).send('something went wrong. try again later');
  }
};

const changeResetPassword = async (req, res) => {
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

    let {
      _id,
      firstName,
      middleName,
      lastName,
      dob,
      email,
      username,
      jwtTokens: newTokens,
    } = dbData;
    const jwtToken = createToken({
      firstName,
      middleName,
      lastName,
      dob,
      email,
      username,
    });

    newTokens.push(jwtToken);
    newTokens.length > 5 && newTokens.shift();
    await userModel.findByIdAndUpdate(_id, { jwtTokens: newTokens });

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

export { registerUser, loginUser, getUserByEmail, logoutUser };
