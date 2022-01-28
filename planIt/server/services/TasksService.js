import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TasksService {


  async getByProject(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId: projectId }).populate('creator')
    if (!tasks) {
      throw new BadRequest('Task Unknown')
    }
    return tasks
  }

  async create(task) {
    const createdTask = await dbContext.Tasks.create(task)
    await createdTask.populate('creator', 'name')
    return createdTask
  }

  async remove(taskId, creatorId) {
    const deletedTask = await dbContext.Tasks.findOneAndDelete({ _id: taskId, creatorId: creatorId })
    if (!deletedTask) {
      throw new BadRequest('Unable To Delete')
    }
    return deletedTask
  }
  async edit(updated) {
    const original = await dbContext.Tasks.findById({ _id: updated.id })
    if (original.creatorId.toString() !== updated.creatorId) {
      throw new BadRequest('Unable To Edit')
    }
    original.name = updated.name || original.name
    original.weight = updated.weight || original.weight
    original.isComplete = updated.isComplete == null ? original.isComplete : updated.isComplete
    original.sprintId = updated.sprintId || original.sprintId
    await original.save()
    return original
  }

}

export const tasksService = new TasksService()