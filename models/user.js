const mongoose = require("mongoose");
const { SCHEMA_OPTIONS } = require("../common/const/schema");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
    },
    hashValue: {
        type: String,
        required: [true, "hashValue is required"],
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, SCHEMA_OPTIONS);

module.exports = User = mongoose.model("users", UserSchema);