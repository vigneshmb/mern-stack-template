import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    dob: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    oldPasswords: { type: [String] },
    jwtTokens: { type: [String] },
    passkeys: { type: [String] },
    resetOtp: { type: Number },
    otpAttempt: { type: Number },
    tags: { type: [String] },
    roleId: { type: Number },
    isDisabled: { type: Boolean, default: false, select: false },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true },
);
export const userModel = model('user', userSchema);
