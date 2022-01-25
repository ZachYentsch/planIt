import { tasksService } from "../services/TasksService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider"

export class TasksController extends BaseController {
    constructor() {
        super("api/projects/:projectId/tasks")
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getByProject)
            .post('', this.create)
            .delete('/:id', this.remove)
            .put('/:id', this.edit)
    }

    async getByProject(req, res, next) {
        try {
            const tasks = await tasksService.getByProject()
            return res.send(tasks)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.creatorId
            req.body.projectId = req.params.projectId
            req.body.sprintId = req.params.projectId
            const task = await tasksService.create(req.body)
            return res.send(task)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            await tasksService.remove(req.params.id, req.userInfo.id)
            return res.send('Task was delorted')
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const updated = await tasksService.edit(req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
}