const Notes = require('../model/noteModel');

const addNote = async (noteData) => {
    if(!noteData) {
        throw new Error("Document's data not found");
    }
    const note = new Notes(noteData);
    return await note.save();
};

const deleteNote = async (noteId) => {
    if (!noteId) {
        throw new Error("Note ID is required");
    }
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if (!deletedNote) {
        throw new Error("Note not found");
    }
    return deletedNote;
};

module.exports = {
    addNote,
    deleteNote
}