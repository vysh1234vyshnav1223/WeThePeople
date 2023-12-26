// middlewares/paymentValidationMiddleware.js
const { body, validationResult } = require('express-validator');

exports.validatePaymentData = [
    body('cardNumber').isLength({ min: 16, max: 16 }).isNumeric().withMessage('Invalid card number'),
    body('cardholderName').trim().isLength({ min: 1 }).withMessage('Cardholder name is required'),
    body('expiryDate').matches(/^(0[1-9]|1[0-2])\/\d{2}$/).withMessage('Invalid expiry date. Use MM/YY format'),
    body('cvv').isLength({ min: 3, max: 4 }).isNumeric().withMessage('Invalid CVV'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
];
