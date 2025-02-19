const Notes = require('../model/noteModel');

const addNote = async ({ documentId, value, name }) => {
    if (!documentId || !value) {
        throw new Error("Document ID and note value are required");
    }

    try {
        const note = await Notes.findOneAndUpdate(
            { documentId }, 
            { 
                $push: { notes: { value, name } } 
            },
            { upsert: true, new: true } 
        );

        return note;
    } catch (error) {
        throw new Error(`Error adding note: ${error.message}`);
    }
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