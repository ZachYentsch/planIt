import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ProjectsService {
    async getAllProjects() {
        const res = await api.get('api/projects')
        logger.log(res.data)
        AppState.projects = res.data
    }

    async getProjectById(id) {
        const res = await api.get('api/projects/' + id)
        logger.log('Get project By id', res.data)
        AppState.project = res.data
    }

    async createProject(newProject) {
        const res = await api.post('api/projects', newProject)
        logger.log(res.data)
        AppState.projects.unshift(res.data)
    }
}

export const projectsService = new ProjectsService()