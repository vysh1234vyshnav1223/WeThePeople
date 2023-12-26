const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const ImagesMiddleware = require('../middlewares/imagesMiddleware');

router.post('/', ImagesMiddleware.array('images', 100), uploadController.uploadFiles);

module.exports = router;
