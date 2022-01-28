import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {

  async getNotes(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log('notes res', res.data)
    AppState.notes = res.data
  }

  async createNote(newNote, id, taskId) {
    newNote.taskId = taskId
    const res = await api.post(`api/projects/${id}/notes`, newNote)
    logger.log(res.data)
    AppState.notes.unshift(res.data)
  }

  async removeNote(projectId, id) {
    const res = await api.delete(`api/projects/${id}/notes/` + projectId)
    logger.log('removed Note', res.data)
    AppState.notes = AppState.notes.filter(n => n.id != n.id)
  }
}

export const notesService = new NotesService()