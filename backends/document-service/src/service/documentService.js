const Document = require('../model/documentModel');
const Delta = require('quill-delta');
const config = require('../config/config');

const createDocument = async (documentData) => {
    if(!documentData) {
        throw new Error("Document's data not found");
    }
    const document = new Document(documentData);
    return await document.save();
}

const getDocumentById = async (documentId) => {
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
            updatedAt: document.updatedAt,
            accessStatus: document.accessStatus,
        }
        return convertedDocument;
    } catch(error) {
        throw new Error(`Error fetching document: ${error.message}`);
    }
}


const updateDocument = async (updatedData) => {
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

const updateDocTitle = async (documentId, newDocTitle) => {
    try {
        const UpdatedDoc = Document.findByIdAndUpdate(
            documentId,
            { title: newDocTitle },
            { new: true }
        )

        if (!UpdatedDoc) {
            console.log("Document not found");
            return null;
        }

        return UpdatedDoc;
    } catch (error) {
        console.log(error);
    }
} 

const giveAccess = async (userId, documentId) => {
    try {
        // Fetch user details and document in parallel
        const [userResponse, document] = await Promise.all([
            axios.get(`${config.user_service}/api/users/${userId}`, {
                headers: { "x-internal-service-key": config.internal_service_key }
            }),
            getDocumentById(documentId) // Direct function call
        ]);
        console.log(userResponse, document)

        if (!document) return { success: false, message: "Document not found" };

        const user = userResponse.data?.user;
        if (!user) return { success: false, message: "User not found" };

        // Check if user already has access
        if (document.sharedPersons.some(person => person.email === user.email)) {
        return { success: false, message: "User already has access" };
        }

        // Add user to sharedPersons list
        const updatedDocument = await Document.findByIdAndUpdate(
            documentId,
            {
                $addToSet: { sharedPersons: { email: user.email, name: user.name || "Unknown", role: "Viewer" } }
            },
            { new: true }
        );
        
        return { success: true, message: "User granted access", document: updatedDocument };
    } catch (error) {
        console.log(error)
        return { success: false, message: "Error giving access" };
    }
}



module.exports = {
    createDocument,
    getDocumentById,
    updateDocument,
    updateDocTitle,
    giveAccess,
};