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