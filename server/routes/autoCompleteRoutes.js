// routes/autocompleteRoutes.js
const express = require('express');
const router = express.Router();
const autocompleteController = require('../controllers/autoCompleteController');

router.get('/', autocompleteController.getAutocompleteSuggestions);

module.exports = router;
