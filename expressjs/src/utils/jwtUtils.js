import jwt from 'jsonwebtoken';

const jwtTokenSecret = process.env.TOKEN_SKY;
const jwtEncrpAlgo = process.env.TOKEN_ALGO;

export const createToken = (userData = {}) =>
  jwt.sign(userData, jwtTokenSecret, {
    algorithm: jwtEncrpAlgo,
    expiresIn: '30d',
  });

export const verifyToken = (token) => {
  const decryptValue = jwt.verify(
    token,
    jwtTokenSecret,
    { algorithms: [jwtEncrpAlgo] },
    (err, userData) => {
      if (err && err?.name === 'TokenExpiredError') {
        return 'JWT Expired';
      }

      return userData;
    },
  );

  return decryptValue;
};
