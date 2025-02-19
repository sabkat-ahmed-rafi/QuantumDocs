const Notes = require('../model/noteModel');

const addNote = async (noteData) => {
    if(!noteData) {
        throw new Error("Document's data not found");
    }
    const note = new Notes(noteData);
    return await note.save();
};

module.exports = {
    addNote
}