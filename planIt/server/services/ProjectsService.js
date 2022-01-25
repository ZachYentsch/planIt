import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ProjectsService {
  // NOTE get all your projects
  async getAll() {
    const projects = await dbContext.Projects.find().populate('creator', 'name')
    return projects
  }

  // NOTE get on project by id
  async getById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name')
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }

  // NOTE create project
  async create(body) {
    const createdProject = await dbContext.Projects.create(body)
    await createdProject.populate('creator', 'name picture')
    return createdProject
  }

  // NOTE delete project
  async remove(projectId, creatorId) {
    const original = await this.getById(projectId)
    if (original.creatorId.toString() !== creatorId) {
      throw new BadRequest('Cannot Delete')
    }
    await dbContext.Projects.findOneAndRemove({ _id: projectId, creatorId: creatorId })
  }

}

export const projectsService = new ProjectsService()