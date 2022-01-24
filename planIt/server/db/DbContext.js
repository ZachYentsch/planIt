import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { NoteSchema } from "../models/Note";
import { ProjectSchema } from "../models/Project";
import { SprintSchema } from "../models/Sprint";
import { TaskSchema } from "../models/Task";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Notes = mongoose.model('Note', NoteSchema);

  Tasks = mongoose.model('Task', TaskSchema);

  Sprints = mongoose.model('Sprint', SprintSchema)

  Projects = mongoose.model('Project', ProjectSchema)


}

export const dbContext = new DbContext()
