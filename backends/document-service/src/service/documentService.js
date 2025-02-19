const Document = require('../model/documentModel');
const Delta = require('quill-delta');

const createDocument = async (documentData) => {
    if(!documentData) {
        throw new Error("Document's data not found");
    }
    const document = new Document(documentData);
    return await document.save();
};

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
};


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
};

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
}; 

const giveAccess = async (documentId, user) => {
    try {
        const document = await getDocumentById(documentId)

        if (!document) return { success: false, message: "Access Denied" };

        if (!user) return { success: false, message: "Access Denied" };

        // Check if user already has access
        if (document.sharedPersons.some(person => person.email === user.email)) {
        return { success: false, message: "User already has access" };
        }

        // Add user to sharedPersons list
        const updatedDocument = await Document.findByIdAndUpdate(
            documentId,
            {
                $addToSet: { sharedPersons: { email: user.email, name: user.name || "Unknown", photo: user.profilePicture } }
            },
            { new: true }
        );
        
        return { success: true, message: "User granted access", document: updatedDocument };
    } catch (error) {
        console.log(error)
        return { success: false, message: "Access Denied" };
    }
};

const giveRoleToAccessibleUser = async (documentId, userEmail, newRole) => {    
    try {
        
        const document = await getDocumentById(documentId);
        if (!document) return { success: false, message: "Something went wrong" };

        // Update the role of the user in sharedPersons
        const updatedDocument = await Document.findOneAndUpdate(
            { _id: documentId, "sharedPersons.email": userEmail },
            { $set: { "sharedPersons.$.role": newRole } },
            { new: true }
        );

        if (!updatedDocument) {
            return { success: false, message: "Something went wrong" };
        }

        return { success: true, message: "User role updated successfully", document: updatedDocument };

    } catch (error) {
        return { success: false, message: "Internal server error" };
    }

    
};

const removeAccess = async (documentId, userEmail) => {
    try {
        const result = await Document.updateOne(
            { _id: documentId },
            { $pull: { sharedPersons: { email: userEmail } } }
        );

        if (result.modifiedCount > 0) {
            return { success: true, message: "User access removed" };
        } else {
            return { success: false, message: "Something went wrong" };
        }
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
};

const changeDocumentStatus = async (documentId, newValue) => {
    try {
        const document = await getDocumentById(documentId);
        if (!document) return { success: false, message: "Something went wrong" };

        const updatedDocumentStatus = await Document.findOneAndUpdate(
            { _id: documentId },
            { $set: { "accessStatus.isRestricted": newValue } },
            { new: true }
        );

        if (!updatedDocumentStatus) {
            return { success: false, message: "Something went wrong" };
        }

        return { success: true, message: "Document access status updated", document: updatedDocumentStatus };

    } catch {
        return { success: false, message: "Internal server error" };
    }
};

const changeDocumentRole = async (documentId, newRole) => {
    try {
        const document = await getDocumentById(documentId);
        if (!document) return { success: false, message: "Something went wrong" };

        const updatedDocument = await Document.findOneAndUpdate(
            { _id: documentId },
            { $set: { "accessStatus.role": newRole } },
            { new: true }
        );

        if (!updatedDocument) {
            return { success: false, message: "Something went wrong" };
        }

        return { success: true, message: "Document access role updated", document: updatedDocument };

    } catch {
        return { success: false, message: "Internal server error" };
    }
}

module.exports = {
    createDocument,
    getDocumentById,
    updateDocument,
    updateDocTitle,
    giveAccess,
    giveRoleToAccessibleUser,
    removeAccess,
    changeDocumentStatus,
    changeDocumentRole
};