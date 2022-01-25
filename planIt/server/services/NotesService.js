import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class NotesService {
  async getByProject(projectId) {
    const notes = await dbContext.Notes.find({ _id: projectId }).populate('creator')
    if (!notes) {
      throw new BadRequest('Notes Unknown')
    }
    return notes
  }

  async create(note) {
    const createdNote = await dbContext.Notes.create(note)
    await createdNote.populate('creator', 'body', 'projectId')
    return createdNote
  }

  async remove(noteId, creatorId) {
    const deletedNote = await dbContext.Notes.findOneAndDelete({ _id: noteId, creatorId: creatorId })
    if (!deletedNote) {
      throw new BadRequest('Unable to Delete')
    }
    return deletedNote
  }

}

export const notesService = new NotesService()