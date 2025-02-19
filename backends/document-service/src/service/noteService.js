const Notes = require('../model/noteModel');

const addNote = async (documentId, value, name) => {
    if (!documentId || !value) {
        return { success: false, message: "Something went wrong" };
    }

    try {
        const note = await Notes.findOneAndUpdate(
            { documentId }, 
            { 
                $push: { notes: { value, name } } 
            },
            { upsert: true, new: true } 
        );

        return { success: true, message: "note created successfully", note };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
};

const deleteNote = async (noteId) => {
    if (!noteId) {
        return { success: false, message: "Something went wrong" };
    }
    const deletedNote = await Notes.findByIdAndDelete(noteId);

    if (!deletedNote) {
        return { success: false, message: "Something went wrong" };
    }
    return { success: true, message: "note deleted successfully" };
};

const getNotes = async (documentId) => {
    try {
        if (!documentId) {
            return { success: false, message: "Something went wrong" };
        };
    
        const notes = await Notes.findOne({ documentId });
    
        if(!notes) {
            return { success: false, message: "Something went wrong" };
        };

        return { success: true, message: "Note Found", notes };

    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = {
    addNote,
    deleteNote, 
    getNotes
}