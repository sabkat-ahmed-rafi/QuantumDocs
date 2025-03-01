const documentController = require('../controller/documentController');
const express = require('express');
const router = express.Router();


router.post('/', documentController.create); // Create a new document

// Access Management
router.patch('/access', documentController.giveAccess); // Grant access
router.patch('/access/role', documentController.giveRoleToAccessibleUser); // Assign role
router.delete('/access', documentController.removeAccess); // remove access


router.delete('/:id', documentController.deleteDocument);
router.patch('/accessStatus/changeAccess', documentController.changeDocumentStatus);
router.patch('/accessStatus/changeRole', documentController.changeDocumentRole);
router.get('/search', documentController.searchDocument);
router.get('/getAllDocuments', documentController.getAllDocuments);
router.get('/:id', documentController.get);

module.exports = router;