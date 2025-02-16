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

exports.giveAccess = async (req, res) => {
	 try {
		const {documentId, userUid} = req.body;
		const sharedAccess = await documentService.giveAccess(documentId, userUid);
		res.status(200).json({ sharedAccess });
	 } catch(error) {
		res.status(500).json({ message: error.message })
	 }
}