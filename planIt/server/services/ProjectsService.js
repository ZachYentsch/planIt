import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ProjectsService {
  // NOTE get all your projects
  async getAll(creatorId) {
    const projects = await dbContext.Projects.find({ creatorId: creatorId }).populate('creator', 'name')
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
  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Cannot Delete')
    }
    await dbContext.Projects.findOneAndRemove({ _id: id, creatorId: userId })
  }

}

export const projectsService = new ProjectsService()