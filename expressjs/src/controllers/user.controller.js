import { userModel } from '#Models/user.model.js';
import { checkHash, generateHash } from '#Utils/bcryptUtils.js';
import { populateJoiMessage } from '#Utils/joiUtils.js';
import { createToken } from '#Utils/jwtUtils.js';
import {
  registerUserSchema,
  loginUserSchema,
  changeResetPasswordSchema,
} from '#Validators/user.validator.js';

const defProjectFilter = {
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
};

const defFieldFilter = {
  isDisabled: false,
  isDeleted: false,
};

const registerUser = async (req, res) => {
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      const msg = populateJoiMessage(error);
      return res.status(400).send({
        error: [],
        msg,
        data: null,
      });
    }
    const userEmail = req.body.email;
    const dbData = await getUserByEmail(userEmail);
    if (dbData && Object.keys(dbData).length > 0) {
      return res.status(401).send({
        error: [],
        msg: 'Email already registered',
        data: null,
      });
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
    return res.status(201).send({
      error: null,
      msg: 'User created successfully',
      data: [],
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
      const msg = populateJoiMessage(error);
      return res.status(400).send({
        error: [],
        msg,
        data: null,
      });
    }
    const userEmail = req.body.emailUsername;
    const dbData = await getUserByEmail(userEmail);

    if (!(dbData && Object.keys(dbData).length > 0)) {
      return res.status(401).send({
        error: [],
        msg: 'Account is not registered',
        data: null,
      });
    }

    let loginData = req.body;
    let passwdCheck = await checkHash(loginData?.password, dbData?.password);
    if (!passwdCheck) {
      return res.status(401).send({
        error: [],
        msg: 'Password is wrong',
        data: null,
      });
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
      _id,
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

    res.setHeader('Authorization', jwtToken);
    return res.status(200).send({
      error: null,
      msg: 'Loggedin successfully',
      data: [],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    let { email } = req?.userData;
    const dbData = await getUserByEmail(email);
    let { _id, jwtTokens } = dbData;
    const fullToken = req?.headers?.['authorization'] || null;
    const jwtToken = fullToken.split(' ')[1];

    let newTokens = jwtTokens.filter((token) => token !== jwtToken);
    await userModel.findByIdAndUpdate(_id, { jwtTokens: newTokens });
    return res.status(200).send({
      error: null,
      msg: 'Logout successful',
      data: [],
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const changeResetPassword = async (req, res) => {
  try {
    const { error } = changeResetPasswordSchema.validate(req.body);
    if (error) {
      const msg = populateJoiMessage(error);
      return res.status(400).send({
        error: [],
        msg,
        data: null,
      });
    }

    const { emailUsername, password, newPassword, otp } = req.body;
    const dbData = await getUserByEmail(emailUsername);
    let { oldPasswords: passwordArray, _id, resetOtp, otpAttempt } = dbData;

    if (!(dbData && Object.keys(dbData).length > 0)) {
      return res.status(401).send({
        error: [],
        msg: 'Account is not registered',
        data: null,
      });
    }

    const isChangePswd = password && password !== '';
    let hashedPswd = '';
    if (isChangePswd) {
      let passwdCheck = await checkHash(password, dbData?.password);
      if (!passwdCheck) {
        return res.status(401).send({
          error: [],
          msg: 'Password is wrong',
          data: null,
        });
      }
    } else {
      // reset password logic with email otp
      let userData = {},
        msg = '';
      if (otpAttempt > 3) {
        msg = 'Account is locked since Maximum OTP attempts reached.';
        userData = {
          ...dbData,
          isDisabled: true,
        };
      } else if (resetOtp && otp !== resetOtp) {
        msg = 'OTP is wrong';
        userData = {
          ...dbData,
          otpAttempt: otpAttempt + 1,
        };
      }
      if (msg !== '') {
        await userModel.findByIdAndUpdate(_id, { ...userData });
        return res.status(401).send({
          error: [],
          msg,
          data: null,
        });
      }
    }

    hashedPswd = await generateHash(newPassword);
    passwordArray.push(hashedPswd);
    passwordArray.length > 3 && passwordArray.shift();

    let newData = {
      password: hashedPswd,
      oldPasswords: passwordArray,
      resetOtp: null,
      otpAttempt: 0,
    },
      msg = '';

    await userModel.findByIdAndUpdate(_id, newData);
    msg = isChangePswd
      ? 'Password changed successfully'
      : 'Password reset successfully';
    return res.status(200).send({
      error: null,
      msg,
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userEmail = req.userData.email;
    const dbData = await userModel.find(
      { ...defFieldFilter, email: userEmail },
      {
        _id: 0,
        firstName: 1,
        middleName: 1,
        lastName: 1,
        dob: 1,
        email: 1,
        username: 1,
      },
    );
    return res.status(200).send({
      error: null,
      msg: '',
      data: dbData,
    });
  } catch (error) {
    return res.status(500).send({
      error: [],
      msg: 'Something went wrong. Try again later',
      data: null,
    });
  }
};

const getUserByEmail = async (email) => {
  const dbData = await userModel.find(
    { ...defFieldFilter, email },
    { ...defProjectFilter },
  );
  return dbData?.[0] || {};
};

export {
  registerUser,
  loginUser,
  getUserByEmail,
  logoutUser,
  changeResetPassword,
  getUserDetails,
};
