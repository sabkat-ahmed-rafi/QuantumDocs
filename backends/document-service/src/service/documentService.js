const Document = require('../model/documentModel');

exports.createDocument = async (documentData) => {
    if(!documentData) {
        throw new Error("Document's data not found");
    }
    const document = new Document(documentData);
    return await document.save();
}

exports.getDocumentById = async (documentId) => {
    if(!documentId) {
        throw new Error("User is required")
    }
    try{
        const document = await Document.findById(documentId);
        if(!document) {
            throw new Error("Document not found");
        }
        const convertedDocument = {
            id: document._id,
            state: document.state ? Array.from(document.state) : [],
            title: document.title,
            owner: document.owner,
            sharedPersons: document.sharedPersons,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt
        }
        return convertedDocument;
    } catch(error) {
        throw new Error(`Error fetching document: ${error.message}`);
    }
}