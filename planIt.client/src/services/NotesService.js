import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {

  async getNotes(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log('notes res', res.data)
    AppState.notes = res.data
  }
}

export const notesService = new NotesService()