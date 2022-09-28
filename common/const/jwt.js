const JWT_ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const JWT_OPTIONS = { expiresIn: "1h" };
const JWT_REFRESH_TOKEN_OPTIONS = { expiresIn: "10m" };

module.exports = {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_OPTIONS,
    JWT_REFRESH_TOKEN_OPTIONS
}