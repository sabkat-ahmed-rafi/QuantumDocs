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
        const documentId = req.params.body;
        console.log(documentId)

        const getNote = await noteService.getNotes(documentId);
        res.status(200).json({ getNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const documentId = req.params.body;
        const deleteNote = await noteService.deleteNote(documentId);
        res.status(200).json({ deleteNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}