import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class SprintsService {




  async getByProject(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId: projectId }).populate('creator')
    if (!sprints) {
      throw new BadRequest('Sprints Unknown')
    }
    return sprints
  }

  async create(newSprint) {
    const createdSprint = await dbContext.Sprints.create(newSprint)
    await createdSprint.populate('creator', 'name')

    return createdSprint
  }

  async remove(sprintId, creatorId) {
    const deletedSprint = await dbContext.Sprints.findOneAndDelete({ _id: sprintId, creatorId: creatorId })

    if (!deletedSprint) {
      throw new BadRequest('no delete sprint')
    }
    return deletedSprint
  }

}

export const sprintsService = new SprintsService()