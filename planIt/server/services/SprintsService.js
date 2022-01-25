import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class SprintsService {

  // NOTE create sprint

  async create(sprint) {
    await dbContext.Sprints.create(sprint)
    return sprint
  }
  // NOTE get sprints by project
  async getByProject(projectId) {
    const sprints = await dbContext.Sprints.find({ _id: projectId }).populate('creator')
    if (!sprints) {
      throw new BadRequest('Sprints Unknown')
    }
    return sprints
  }
  // TODO delete sprint
  async remove(sprintId, creatorId) {
    const deletedSprint = await dbContext.Sprints.findOneAndDelete({ _id: sprintId, creatorId: creatorId })

    if (!deletedSprint) {
      throw new BadRequest('no delete sprint')
    }
    return deletedSprint
  }

}

export const sprintsService = new SprintsService()