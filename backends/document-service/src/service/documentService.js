const Document = require('../model/documentModel');
const Delta = require('quill-delta');

const createDocument = async (documentData) => {
    if(!documentData) {
        throw new Error("Document's data not found");
    }
    const document = new Document(documentData);
    return await document.save();
};

const getAllDocument = async (userEmail, ownershipFilter, lastId = null, limit = 8) => {

    let query;

    if(ownershipFilter === "me") {
        query = { "owner.email": userEmail };
    } else if(ownershipFilter === "anyone") {
        query = {
            $or: [
                query = { "owner.email": userEmail },
                { sharedPersons: { $elemMatch: { email: userEmail } } }                
            ]
        };
    }

    if(lastId) {
        query._id = { $gt: lastId };
    }
    
    try {
        const documents = await Document.find(query)
        .sort({ _id: 1 })
        .limit(limit);

        return { 
            success: true, 
            message: "Documents found", 
            documents,
            lastId: documents.length > 0 ? documents[documents.length - 1]._id : null 
        };
    } catch (error) {
        return { success: false, message: "Something went wrong" }
    }
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
        const oldData = updatedData?.oldData;
        const newData = updatedData?.newData;
        
        
        // parsing them into quill Deltas
        const oldDelta = new Delta(oldData);
        const newDelta = new Delta(newData);

        // removing two /n which are added by quilljs 
        if (oldDelta.ops.length > 0) {
            let lastOp = oldDelta.ops[oldDelta.ops.length - 1];
            if (typeof lastOp.insert === "string") {
                lastOp.insert = lastOp.insert.replace(/\n$/, "");
                lastOp.insert = lastOp.insert.replace(/\n$/, "");
            }
        }

        // Prepare the updated state using Buffer
        const mergedDelta = oldDelta.compose(newDelta);
        const mergedData = Buffer.from(JSON.stringify({ ops: mergedDelta.ops }));

        const updatedDocument = await Document.findByIdAndUpdate(
            documentId,
            { $set: { state: mergedData } },
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

const searchDocument = async (search, userEmail) => {
    try {
        if (!search) {
            return { success: false, message: "Internal server error" };
        };
        
        const query = { 
            $or: [
                { "owner.email": userEmail },
                { "sharedPersons.email": userEmail }
            ],
            title: { $regex: `^${search}`, $options: "i" }
         };
        const documents = await Document.find(query).select("title owner.name createdAt").limit(5);
    
        return { success: true, message: "Documents found", documents };
    } catch (error) {
        return { success: false, message: "Internal server error" };
    }
} 

const deleteDocument = async (documentId) => {
    try {
        const result = await Document.findByIdAndDelete(documentId);
        if(result._id == documentId) {  
          return { success: true, message: "Document deleted successfully" }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

const updateThumbnail = async (documentId, thumbnailURL) => {
    try {
        const updateThumbnail = await Document.findByIdAndUpdate(
            documentId, 
            { $set: { preview: thumbnailURL } }
        )
        return updateThumbnail;
    } catch (error) {
        return console.log("Something went wrong while updating thumbnail")
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
    changeDocumentRole,
    searchDocument,
    getAllDocument,
    deleteDocument,
    updateThumbnail
};