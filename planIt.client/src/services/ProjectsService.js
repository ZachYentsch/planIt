
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {

  async getProjects() {
    try {
      const res = await api.get("api/projects")
      AppState.projects = res.data
    } catch (error) {
      logger.error('cannot get projects', error)
    }
  }


}

export const projectsService = new ProjectsService()