const documentController = require('../controller/documentController');
const express = require('express');
const checkDocumentAccess = require('../middleware/checkDocumentAccess');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Document Creation
router.post('/', documentController.create); // Create a new document

// Access Management
router.patch('/access', documentController.giveAccess); // Grant access
router.patch('/access/role', documentController.giveRoleToAccessibleUser); // Assign role
router.delete('/access', documentController.removeAccess); // remove access

// Document Status and Roles
router.patch('/status/visibility', documentController.changeDocumentStatus); // Change visibility
router.patch('/status/role', documentController.changeDocumentRole); // Change user role

// Document Retrieval
router.get('/search', documentController.searchDocument); // Search documents
router.get('/', documentController.getAllDocuments); // Get all documents
router.get('/:id', checkDocumentAccess, documentController.get); // Get a single document

// Document Deletion
router.delete('/:id', documentController.deleteDocument);

// User Update Route
router.patch('/updateUser', documentController.updateUser);

module.exports = router;