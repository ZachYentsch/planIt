import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TasksService {

  // NOTE create task
  async create(task) {
    const createdTask = await dbContext.Tasks.create(task)
    return createdTask
  }
  // NOTE get tasks by projectId
  async getByProject(projectId) {
    const tasks = await dbContext.Tasks.find({ _id: projectId }).populate('creator')
    if (!tasks) {
      throw new BadRequest('Task Unknown')
    }
    return tasks
  }
  // NOTE delete task
  async remove(taskId, creatorId) {
    const deletedTask = await dbContext.Tasks.findOneAndDelete({ _id: taskId, creatorId: creatorId })
    if (!deletedTask) {
      throw new BadRequest('Unable To Delete')
    }
    return deletedTask
  }

  // NOTE edit task
  async edit(updated) {
    const original = await dbContext.Tasks.findById(updated.id)
    if (original.creatorId.toString() !== updated.creatorId) {
      throw new BadRequest('Unable To Edit')
    }
    original.name = updated.name || original.name
    original.weight = updated.weight || original.weight
    await original.save()
    return original
  }

}

export const tasksService = new TasksService()