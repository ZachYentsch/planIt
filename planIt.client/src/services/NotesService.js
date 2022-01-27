import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {

  async getNotes(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log('notes res', res.data)
    AppState.notes = res.data
  }

  async createNotes(newNote, id) {
    const res = await api.post(`api/projects/${id}/notes`, newNote)
    logger.log(res.data)
    AppState.notes.unshift(res.data)
  }
}

export const notesService = new NotesService()