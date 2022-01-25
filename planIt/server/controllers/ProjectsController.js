import BaseController from "../utils/BaseController";

export class ProjectsController extends BaseController {


  constructor() {
    super("api/projects")
    this.router
      .get('', this.getUsersProjects)
    // TODO get all your projects
    // TODO get on project by id
    // TODO create project
    // TODO delete project


  }
  async getUsersProjects(req, res, next) {
    try {
      const
    } catch (error) {
      next(error)
    }
  }
}