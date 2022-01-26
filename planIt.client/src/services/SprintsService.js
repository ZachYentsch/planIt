import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {

    async getSprints(projectId) {
        const res = await api.get(`api/projects/${projectId}/sprints`)
        logger.log('sprints res', res.data)
        AppState.sprints = res.data
    }
}

export const sprintsService = new SprintsService()