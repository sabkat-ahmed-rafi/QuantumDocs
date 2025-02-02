const documentService = require('../service/documentService');


exports.create = async (req, res) => {
	try {
		const owner = req.body;
		const document = await documentService.createDocument(owner);
		res.status(200).json({ message: "Document created successfully", document });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.get = async (req, res) => {
	try {
		const documentId = req.params.id
		const document = await documentService.getDocumentById(documentId);
		res.status(200).json({ message: "Document found", document });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const updatedData = req.body;
        await documentService.updateDocument(updatedData);
		res.status(200).json({ message: "Document updated" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

exports.updateTitle = async (req, res) => {
	try {
		const newTitle = req.params.newTitle;
		await documentService.UpdateDocTitle(newTitle);
		res.status(200).json({ message: "Document title updated" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}