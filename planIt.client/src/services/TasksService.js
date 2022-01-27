import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getTasks(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`)
    logger.log('Tasks res', res.data)
    AppState.tasks = res.data
  }

  async createTask(newTask, id) {
    const res = await api.post(`api/projects/${id}/tasks`, newTask)
    logger.log(res.data)
    AppState.tasks.unshift(res.data)
  }
}

export const tasksService = new TasksService()