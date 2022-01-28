import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getTasks(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`)
    logger.log('Tasks res', res.data)
    AppState.tasks = res.data
  }

  async createTask(newTask, id, sprintId) {
    newTask.sprintId = sprintId
    const res = await api.post(`api/projects/${id}/tasks`, newTask)
    logger.log(res.data)
    AppState.tasks.unshift(res.data)
  }

  async removeTask(projectId, id) {
    const res = await api.delete(`api/projects/${id}/tasks/` + projectId)
    logger.log('removed Task', res.data)
    AppState.tasks = AppState.tasks.filter(t => t.id != t.id)
  }
  async taskComplete(task, id) {
    task.isComplete = !task.isComplete
    const res = await api.put(`api/projects/${id}/tasks/` + task.id, task)
    logger.log(res.data)
  }
}


export const tasksService = new TasksService()