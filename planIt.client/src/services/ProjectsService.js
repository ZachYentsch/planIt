import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ProjectsService {
    async getAllProjects() {
        const res = await api.get('api/projects')
        logger.log(res.data)
        AppState.projects = res.data.projects
    }

    async createProject(newProject) {
        const res = await api.post('api/projects', newProject)
        logger.log(res.data)
        AppState.projects.unshift(res.data)
    }
}

export const projectsService = new ProjectsService()