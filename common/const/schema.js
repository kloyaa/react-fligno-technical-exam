const SCHEMA_OPTIONS = {
    autoCreate: false
};

// TTL options
const SCHEMA_TOKEN_EXPIRES = {
    type: Date,
    default: Date.now,
    index: { expires: '1d' },
}

module.exports = {
    SCHEMA_OPTIONS,
    SCHEMA_TOKEN_EXPIRES
}