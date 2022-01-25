import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super("api/projects/:projectId/notes")
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getByProject)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getByProject(req, res, next) {
    try {
      const notes = await notesService.getByProject()
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.taskId
      req.body.creatorId = req.userInfo.creatorId
      const note = await notesService.create(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await notesService.remove(req.params.id, req.userInfo.id)
      return res.send('Note was delorted')
    } catch (error) {
      next(error)
    }
  }
}