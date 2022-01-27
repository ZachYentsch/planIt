import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {

    async getSprints(projectId) {
        const res = await api.get(`api/projects/${projectId}/sprints`)
        logger.log('sprints res', res.data)
        AppState.sprints = res.data
    }

    async createSprint(newSprint, id) {
        const res = await api.post(`api/projects/${id}/sprints`, newSprint)
        logger.log(res.data)
        AppState.sprints.unshift(res.data)
    }
}

export const sprintsService = new SprintsService()