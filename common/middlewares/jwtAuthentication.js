require("dotenv");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../const/jwt");
const { throwError } = require("../utils/errorMessages");

const protected = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json({ message: "Token is required" });
        jwt.verify(token, JWT_ACCESS_SECRET, (err, value) => {
            if (err) return throwError(res, 401, { message: "Token is invalid or expired" });
            req.user = value;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { protected };