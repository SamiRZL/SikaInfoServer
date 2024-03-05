const express = require('express');
const router = express.Router();
const { updateDocument, getDocument, getDocumentsByLanguage, uploadDocument, upload, getDocuments, getDocumentsByAspect, deleteDocument, getDocumentsByAspectAndCategory } = require('../controllers/DocumentController');

router.post('/upload-document', upload.single('pdf'), uploadDocument);
router.get('/all-documents', getDocuments)
router.get('/all-documents/:language', getDocumentsByLanguage)
router.get('/aspect/:aspectId', getDocumentsByAspect);
router.get('/aspect/:aspectId/category/:categoryId', getDocumentsByAspectAndCategory);
router.delete('/:id', deleteDocument);
router.put('/:id', updateDocument);
router.get('/:id', getDocument);

module.exports = router;
