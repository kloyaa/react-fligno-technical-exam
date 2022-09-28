const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SCHEMA_OPTIONS } = require("../common/const/schema");

const FavoriteSchema = new Schema({
    accountId: {
        type: String,
        required: [true, "accountId is required"],
    },
    recipeId: {
        type: String,
        required: [true, "recipeId is required"],
    },
    recipePhoto: {
        type: String,
        required: [true, "recipePhoto is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, SCHEMA_OPTIONS);

module.exports = Favorite = mongoose.model("favorites", FavoriteSchema);