const multer = require('multer');

const ImagesMiddleware = multer({ dest: 'uploads/' });

module.exports = ImagesMiddleware;
