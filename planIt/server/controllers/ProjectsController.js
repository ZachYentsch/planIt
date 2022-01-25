import BaseController from "../utils/BaseController";
import { projectsService } from "../services/ProjectsService";
import { Auth0Provider } from "@bcwdev/auth0provider";
export class ProjectsController extends BaseController {


  constructor() {
    super("api/projects")
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE Get All projects is getUserProjects
      .get('', this.getUsersProjects)

      // NOTE get on project by id
      .get('/:id', this.getProjectsById)
      // NOTE create project
      .post('', this.createProject)
    // TODO delete project


  }

  async getUsersProjects(req, res, next) {
    try {
      const projects = await projectsService.getAll()
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getProjectsById(req, res, next) {
    try {
      const projectsId = await projectsService.getById(req.params.id)
      return res.send(projectsId)
    } catch (error) {
      next(error)
    }
  }
  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createdProject = await projectsService.create(req.body)
      return res.send(createdProject)
    } catch (error) {
      next(error)
    }

  }
  async removeProject(req, res, next) {

    try {
      await projectsService.remove(req.params.id, req.userInfo.id)
    } catch (error) {
      next(error)
    }
  }

}