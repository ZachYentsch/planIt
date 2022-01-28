import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {

    async getSprints(id) {
        const res = await api.get(`api/projects/${id}/sprints`)
        logger.log('sprint res', res.data)
        AppState.sprints = res.data
    }

    async createSprint(newSprint, id) {
        const res = await api.post(`api/projects/${id}/sprints`, newSprint)
        logger.log(res.data)
        AppState.sprints.unshift(res.data)
    }

    async removeSprint(projectId, id) {
        const res = await api.delete(`api/projects/${id}/sprints/` + projectId)
        logger.log('remove Sprint', res.data)
        AppState.sprints = AppState.sprints.filter(s => s.id != s.id)
    }
}

export const sprintsService = new SprintsService()