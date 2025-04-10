const noteService = require('../service/noteService');


exports.addNote = async (req, res) => {
    try {
        const { noteData } = req.body;
        const { documentId, value, name } = noteData; 

        const addNote = await noteService.addNote(documentId, value, name);
        res.status(200).json({ addNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getNotes = async (req, res) => {
    try {
        const { id: documentId } = req.params;
        const getNote = await noteService.getNotes(documentId);
        res.status(200).json({ getNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const { id: noteId } = req.params;
        const documentId = req.body.documentId;
        const deleteNote = await noteService.deleteNote(noteId, documentId);
        res.status(200).json({ deleteNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}