import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {

  constructor() {
    super("api/projects/:projectId/sprints");
    this.router
      // NOTE get sprints by project
      .get('', this.getByProject)
      // NOTE create sprint
      .post('', this.create)
      // NOTE delete sprint
      .delete('/:id', this.remove)
  }
  async getByProject(req, res, next) {
    try {
      const sprints = await sprintsService.getByProject()
      return res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.create(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await sprintsService.remove(req.params.id, req.userInfo.id)
      return res.send('Sprint was deleted')
    } catch (error) {
      next(error)
    }
  }
}