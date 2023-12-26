const { body, validationResult } = require('express-validator');

exports.validateAddProjectUpdate = [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('message').trim().isLength({ min: 1 }).withMessage('Message is required'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
];
