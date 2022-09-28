const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: [true, "refreshToken is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
RefreshTokenSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 86400 }); // Delete doc after specified time
module.exports = RefreshToken = mongoose.model("refresh-tokens", RefreshTokenSchema);