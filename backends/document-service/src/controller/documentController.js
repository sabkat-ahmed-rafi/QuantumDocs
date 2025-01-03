const documentService = require('../service/documentService');


exports.create = async (req, res) => {
	try {
		const document = await documentService.createDocument(req.body);
		res.status(201).json({ message: "Document created successfully", document });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};