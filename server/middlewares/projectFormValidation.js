const { body, validationResult } = require('express-validator');

exports.validateCreateProject = [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
    body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
    body('fundingGoal').isNumeric().withMessage('Funding goal must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
];
