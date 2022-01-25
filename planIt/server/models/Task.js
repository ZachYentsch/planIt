import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  isComplete: { type: Boolean, required: true, default: false },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  sprintId: { type: Schema.Types.ObjectId, required: true, ref: 'Sprint' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
},
  { timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})