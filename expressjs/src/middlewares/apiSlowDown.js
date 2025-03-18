import { slowDown } from 'express-slow-down';

const windowVal = {
  sec: 1000,
  min: 60000,
  hr: 3600000,
};

const getWindowVal = (slot) => windowVal[slot] || 1000;

export const userRouteSlowdown = slowDown({
  windowMs: 5 * getWindowVal('min'),
  delayAfter: 2,
  delayMs: (hits) => hits * 1000,
});

export const getRouteSlowdown = (
  timeValue = 10,
  timeBase = 'min',
  allowReqs = 20,
  delaySeconds = 1,
) => {
  return slowDown({
    windowMs: timeValue * getWindowVal(timeBase),
    delayAfter: allowReqs,
    delayMs: (hits) => hits * delaySeconds * 1000,
  });
};
