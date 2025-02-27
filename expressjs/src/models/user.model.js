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
    oldPasswords: [String],
    jwtTokens: [String],
    tags: String,
    isDisabled: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const userModel = model('user', userSchema);
