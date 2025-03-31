import { model, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: String,
    description: { type: String, default: 'asdf' },
    isDeleted:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false},
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);
export const taskModel = model('task', taskSchema);
