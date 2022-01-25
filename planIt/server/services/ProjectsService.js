import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ProjectsService {
  // NOTE get all your projects
  async getAll() {
    const projects = await dbContext.Projects.find().populate('creator')
    return projects
  }

  // NOTE get on project by id
  async getById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator')
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }

  // NOTE create project
  async create(body) {
    await dbContext.Projects.create(body)
    return body
  }

  // NOTE delete project
  async remove(projectId, userId) {
    const original = await this.getById(projectId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Cannot Delete')
    }
    await dbContext.Projects.findOneAndRemove({ _id: projectId })
  }

}

export const projectsService = new ProjectsService()