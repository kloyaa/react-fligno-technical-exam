const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { COOKIE_OPTIONS, SECURE_COOKIE_OPTIONS } = require("../common/const/http");
const { JWT_REFRESH_SECRET } = require("../common/const/jwt");
const { jwtAccessToken } = require("../common/utils/encodeAndDecodeJwtToken");
const { throwError } = require("../common/utils/errorMessages");

const RefreshToken = require("../models/tokens");

// @DESC Refresh token
router.post("/api/token", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: "Refresh is required" });

        const token = await RefreshToken.findOne({ refreshToken });
        if (!token) return res.status(403).json({ message: "Refresh token was already revoked" });

        jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, value) => {
            if (err) return res.status(403).json({ message: "Refresh token is invalid " });
            const accessToken = jwtAccessToken(value.data);
            return res.status(200)
                .cookie("accessToken", accessToken, SECURE_COOKIE_OPTIONS)
                .json({ accessToken });
        });

    } catch (error) {
        console.log(error)
    }
});

// @DESC Get all refresh tokens
router.get("/api/token", (req, res) => {
    try {
        return RefreshToken.find({})
            .select({ _id: 0, __v: 0 })
            .then(value => res.status(200).json(value))
            .catch(err => throwError(res, 400, err));
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;