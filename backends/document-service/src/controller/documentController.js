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
		const {documentId, user} = req.body;
		const sharedAccess = await documentService.giveAccess(documentId, user);
		res.status(200).json({ sharedAccess });
	 } catch(error) {
		res.status(500).json({ message: error.message })
	 }
}

exports.giveRoleToAccessibleUser  = async (req, res) => {
	try {
		const {documentId, newRole, userEmail} = req.body;
		const giveRole = await documentService.giveRoleToAccessibleUser(documentId, userEmail, newRole);
		res.status(200).json({ giveRole });
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.removeAccess = async (req, res) => {
	try {
		const {documentId, userEmail} = req.body;
		const removedRole = await documentService.removeAccess(documentId, userEmail);
		res.status(200).json({ removedRole });
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.changeDocumentStatus = async (req, res) => {
	try {
		const {documentId, newValue} = req.body;
		const changeStatus = await documentService.changeDocumentStatus(documentId, newValue);
		res.status(200).json({ changeStatus });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

exports.changeDocumentRole = async (req, res) => {
	try {
		const {documentId, newRole} = req.body;
		const changeRole = await documentService.changeDocumentRole(documentId, newRole);
		res.status(200).json({ changeRole });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

exports.searchDocument = async (req, res) => {
    try {
        const {search, userEmail} = req.query;
        if(search && userEmail) {
            const documents = await documentService.searchDocument(search, userEmail);
            res.status(200).json({ documents });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllDocuments = async (req, res) => {
	const { userEmail, ownershipFilter, lastId } = req.query;
    try {
        const documents = await documentService.getAllDocument(userEmail, ownershipFilter, lastId);
        res.status(200).json({ documents });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteDocument = async (req, res) => {
	const documentId = req.params.id;
    try {
        const deleteResult = await documentService.deleteDocument(documentId);
        res.status(200).json({ deleteResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
	const updateDocService = req.body;
	const { email, name, photo } = updateDocService;
    try {
        const updateResult = await documentService.updateUser( email, name, photo );
        res.status(200).json({ updateResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}