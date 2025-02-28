import { getUserByEmail } from '#Controllers/user.controller.js';
import { verifyToken } from '#Utils/jwtUtils.js';

export default async function userAuthCheck(req, res, next) {
  try {
    const fullToken = req?.headers?.['authorization'] || null;
    if (fullToken === null) {
      throw Error('noToken');
    }
    const jwtToken = fullToken.split(' ')[1];

    const decryptData = verifyToken(jwtToken);
    if (typeof decryptData === 'string') {
      throw Error('tokenExpired');
    }

    const { email } = decryptData;
    const dbData = await getUserByEmail(email);
    if (dbData?.jwtTokens?.includes(jwtToken)) {
      req.userData = { ...decryptData };
      next();
    } else {
      return res.status(401).send('Token Expired by Logged out');
    }
  } catch (error) {
    return res.status(401).send('Authentication failed');
  }
}
