const express = require('express');
const router = express.Router();
const {
  getLanguages,
  getTranslation,
  createTranslation,
  updateTranslation,
  deleteTranslation
} = require('../controllers/translationController');

// Public routes
router.get('/languages', getLanguages);
router.get('/translations/:languageCode', getTranslation);

// Admin routes (would require authentication middleware in production)
router.post('/translations', createTranslation);
router.put('/translations/:languageCode', updateTranslation);
router.delete('/translations/:languageCode', deleteTranslation);

module.exports = router;
