import jwt from "jsonwebtoken";

const jwtTokenSecret = process.env.TOKEN_SKY

export const createToken =(userData={})=> jwt.sign(userData,jwtTokenSecret);
