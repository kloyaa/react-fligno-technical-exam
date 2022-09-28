const { check } = require("express-validator");

const validatorRegistration = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password', 'Password is required')
        .notEmpty()
        .isLength({ min: 10, max: 25 })
        .withMessage("Password must have at least 10 characters and maximum of 25")
        .not()
        .matches(/^[A-Za-z0-9 .,'!&]+$/)
        .withMessage("Password must have at least 1 special character"),
];

const validatorLogin = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password', 'Password is required').notEmpty()
];

const validatorChangePass = [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password', 'Password is required').notEmpty(),
    check('newPassword', 'New password is required')
        .notEmpty()
        .isLength({ min: 10, max: 25 })
        .withMessage("Password must have at least 10 characters and maximum of 25")
        .not()
        .matches(/^[A-Za-z0-9 .,'!&]+$/)
        .withMessage("Password must have at least 1 special character"),
]

const validatorLogout = [
    check('refreshToken', 'Refresh token is required').notEmpty()
];

const validatorFavorite = [
    check('recipeId', 'Recipe id is required').notEmpty(),
    check('recipePhoto', 'Recipe photo is required').notEmpty()

];

const validatorConversation = [
    check('senderId', 'Sender id is required').notEmpty(),
    check('receiverId', 'Receiver photo is required').notEmpty()
];
const validatorMessage = [
    check('message', 'message id is required').notEmpty(),
];

module.exports = {
    validatorRegistration,
    validatorLogin,
    validatorChangePass,
    validatorLogout,
    validatorFavorite,
    validatorConversation,
    validatorMessage
}