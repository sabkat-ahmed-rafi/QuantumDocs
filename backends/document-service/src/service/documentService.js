const Document = require('../model/documentModel');

exports.createDocument = async (documentData) => {
    if(!documentData) {
        throw new Error('User');
    }
    const document = new Document(documentData);
    return await document.save();
}