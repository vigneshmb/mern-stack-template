import bcrypt from 'bcryptjs';

export const generateHash = async (text) => {
  const hashedText = await bcrypt.hash(text, 10);
  return hashedText;
};

export const checkHash = async (text, hashedText) => {
  const isMatching = await bcrypt.compare(text, hashedText);
  return isMatching;
};
