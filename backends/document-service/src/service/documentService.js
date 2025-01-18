const Document = require('../model/documentModel');
const Delta = require('quill-delta');

exports.createDocument = async (documentData) => {
    if(!documentData) {
        throw new Error("Document's data not found");
    }
    const document = new Document(documentData);
    return await document.save();
}

exports.getDocumentById = async (documentId) => {
    if(!documentId) {
        throw new Error("Document id is required")
    }
    try{
        const document = await Document.findById(documentId);
        if(!document) {
            throw new Error("Document not found");
        }
        const convertedDocument = {
            id: document._id,
            state: document.state,
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

exports.updateDocument = async (updatedData) => {
    try {
        const documentId = updatedData?.documentId;
        const newData = updatedData?.updatedData;
        const document = await Document.findById(documentId);
        if(!document) {
            throw new Error("Document not found");
        }
        
        // Decode and parse the existing document state from Buffer
        const previousDelta = JSON.parse(Buffer.from(document.state).toString());
        const oldDelta = new Delta(previousDelta.ops || []);
        const newDelta = new Delta(newData)

        // Prepare the updated state using Buffer
        const mergedDelta = oldDelta.compose(newDelta);
        const mergedData = Buffer.from(JSON.stringify({ ops: mergedDelta.ops }));

        const updatedDocument = await Document.findByIdAndUpdate(
            documentId,
            { $set: { state: mergedData } },
            { new: true } // Ensured that the updated document is returned
        );

        return updatedDocument;
    } catch (error) {
        console.log(error)
    }
}