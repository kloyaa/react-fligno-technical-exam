const express = require("express");
const { validationResult } = require("express-validator");
const { validatorConversation, validatorMessage } = require("../common/const/express_validators");
const { JWT_REFRESH_SECRET } = require("../common/const/jwt");
const router = express.Router();
const { protected } = require("../common/middlewares/jwtAuthentication");
const { decodeJwtToken } = require("../common/utils/encodeAndDecodeJwtToken");

const Conversation = require("../models/conversation/conversation");
const Message = require("../models/conversation/message");




// @DESC Add conversation
router.post("/api/user/conversation", protected, async (req, res) => {
    try {
        //     const accountId = decodeJwtToken(req.cookies.refreshToken, JWT_REFRESH_SECRET);
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json(errors.array());

        const accountId = decodeJwtToken(req.cookies.refreshToken, JWT_REFRESH_SECRET);
        let { senderId, receiverId } = req.body;

        senderId = !senderId ? "admin" : accountId; //current-user by default
        receiverId = !receiverId ? "admin" : accountId; //current-user by default

        return new Conversation({ members: [senderId, receiverId] })
            .save()
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));
    } catch (error) {
        console.log(error)
    }
});
// @DESC Get conversations
router.get("/api/user/conversation/own", protected, async (req, res) => {
    try {
        const accountId = decodeJwtToken(req.cookies.refreshToken, JWT_REFRESH_SECRET);
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json(errors.array());

        return Conversation.find({ members: { $in: [accountId] } })
            .select({ __v: 0 })
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));
    } catch (error) {
        console.log(error)
    }
});


// @DESC Add message
router.post("/api/user/conversation/message", protected, async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json(errors.array());

        const accountId = decodeJwtToken(req.cookies.refreshToken, JWT_REFRESH_SECRET);
        const { sender, conversationId } = req.body;
        req.body.sender = !sender ? accountId : "admin"; //current-user by default
        req.body.conversationId = accountId;

        return new Message(req.body)
            .save()
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));
    } catch (error) {
        console.log(error)
    }
});

// @DESC Get messages in a conversation
router.get("/api/user/conversation/:id", protected, async (req, res) => {
    try {
        const conversationId = decodeJwtToken(req.cookies.refreshToken, JWT_REFRESH_SECRET);
        return Message.find({ conversationId })
            .select({ __v: 0 })
            .then(value => res.status(200).json(value))
            .catch(err => res.status(400).json(err));
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;