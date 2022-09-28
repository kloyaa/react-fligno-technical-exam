const express = require("express");
const router = express.Router();
const axios = require("axios");
const { RECIPE_BASE_URL, RECIPE_APP_ID, RECIPE_APP_KEY } = require("../common/const/http");

// @DESC Get all recipes 1-20
router.get("/api/recipes", async (req, res) => {
    try {
        const { searchKeyword, type } = req.query;
        const response = await axios.get(`${RECIPE_BASE_URL}?`, {
            params: {
                q: searchKeyword,
                type,
                app_id: RECIPE_APP_ID,
                app_key: RECIPE_APP_KEY
            }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
});

// @DESC Get all recipes prev - limit
router.get("/api/recipes/next", async (req, res) => {
    try {
        const { searchKeyword, type, _cont } = req.query;
        const response = await axios.get(`${RECIPE_BASE_URL}?`, {
            params: {
                q: searchKeyword,
                _cont,
                type,
                app_id: RECIPE_APP_ID,
                app_key: RECIPE_APP_KEY
            }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
});


// @DESC Get single recipe
router.get("/api/recipes/:recipeId", async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const { type = "public" } = req.query;

        const response = await axios.get(`${RECIPE_BASE_URL}/${recipeId}?`, {
            params: {
                type,
                app_id: RECIPE_APP_ID,
                app_key: RECIPE_APP_KEY
            }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;