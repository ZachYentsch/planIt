import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const NoteSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },

},
  { timestamps: true, toJSON: { virtuals: true } })


NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true,
})