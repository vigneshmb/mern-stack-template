import { verifyToken } from '#Utils/jwtUtils.js';

export default function userAuthCheck(req, res) {
  try {
    const fullToken = req?.headers?.['Authorization'] || null;
    if (fullToken === null) {
      throw Error;
    }
    const jwtToken = fullToken.split(' ')[1];

    verifyToken(jwtToken)
      .then((result) => {
        if (result === 'JWT Expired') {
          throw Error;
        }

        req.userData = result;
        next();
      })
      .catch((err) => {
        throw Error;
      });
  } catch (error) {
    return res.status(401).send('Authentication failed');
  }
}
