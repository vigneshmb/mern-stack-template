import { rateLimit } from 'express-rate-limit';

const windowVal = {
  sec: 1000,
  min: 60000,
  hr: 3600000,
};

const getWindowVal = (slot) => windowVal[slot] || 1000;

export const userRouteLimiter = rateLimit({
  windowMs: 15 * getWindowVal('min'),
  limit: 5,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    return res.status(429).send('Yaru Neenu.? illi yen maduthidhaya.?');
  },
});

export const getRouteLimiter = (
  timeValue = 10,
  timeBase = 'min',
  allowReqs = 100,
  resCode = 429,
  resMsg = 'Yaru Neenu.? illi yen maduthidhaya.?',
) => {
  return rateLimit({
    windowMs: timeValue * getWindowVal(timeBase),
    limit: allowReqs,
    legacyHeaders: true,
    handler: (req, res, next, options) => {
      return res.status(resCode).send(resMsg);
    },
  });
};
