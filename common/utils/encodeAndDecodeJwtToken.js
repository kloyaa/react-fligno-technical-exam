const jwt = require("jsonwebtoken");
const { JWT_REFRESH_SECRET, JWT_REFRESH_TOKEN_OPTIONS, JWT_ACCESS_SECRET } = require("../const/jwt");

const decodeJwtToken = (token, secret) => {
    return jwt.verify(token, secret, (err, value) => {
        if (err) throw err;
        return value.data;
    });
}

const jwtRefreshToken = (data) => {
    return jwt.sign({ data }, JWT_REFRESH_SECRET);
}

const jwtAccessToken = (data) => {
    return jwt.sign({ data }, JWT_ACCESS_SECRET, JWT_REFRESH_TOKEN_OPTIONS);
}

module.exports = {
    decodeJwtToken,
    jwtRefreshToken,
    jwtAccessToken
}