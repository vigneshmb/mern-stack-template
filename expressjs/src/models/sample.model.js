import { model, Schema } from 'mongoose';

const sampleSchema = new Schema(
  {
    title: String,
    description: { type: String, default: 'asdf' },
  },
  { timestamps: true },
);
export const sampleModel = model('sample', sampleSchema);
