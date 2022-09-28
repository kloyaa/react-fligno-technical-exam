const COOKIE_MAX_AGE = 2 * 60 * 60 * 1000;
const SECURE_COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: process.env.NODE_ENV === 'production' && "none",
    secure: process.env.NODE_ENV === 'production',
};
const COOKIE_OPTIONS = {
    httpOnly: false,
    secure: false,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "none",
};

const RECIPE_APP_KEY = "63d7eebc0126c653139b26f93a64e1a4";
const RECIPE_APP_ID = "ca6e1286";
const RECIPE_BASE_URL = `https://api.edamam.com/api/recipes/v2`;

const ORIGIN = [
    'http://localhost:3000',
    'http://localhost:5000',
    "https://[domain].com"
];
module.exports = {
    ORIGIN,
    COOKIE_OPTIONS,
    COOKIE_MAX_AGE,
    RECIPE_BASE_URL,
    RECIPE_APP_KEY,
    SECURE_COOKIE_OPTIONS,
    RECIPE_APP_ID
}
