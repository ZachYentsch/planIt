import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class NotesService {
  // NOTE creat note
  async create(note) {
    await dbContext.Notes.create(note)
    return note
  }
  // NOTE get notes by projectId
  async getByProject(projectId) {
    const notes = await dbContext.Notes.find({ _id: projectId }).populate('creator')
    if (!notes) {
      throw new BadRequest('Notes Unknown')
    }
    return notes
  }
  // NOTE delete note
  async remove(noteId, creatorId) {
    const deletedNote = await dbContext.Notes.findOneAndDelete({ _id: noteId, creatorId: creatorId })
    if (!deletedNote) {
      throw new BadRequest('Unable to Delete')
    }
    return deletedNote
  }

}

export const notesService = new NotesService()