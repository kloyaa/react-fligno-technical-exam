import {
    PREVIEW_RECIPE,
    USER_LOGIN,
    USER_REGISTER,
    GET_POPULAR_RECIPES,
    GET_TRENDING_RECIPES,
    GET_NEXT_RECIPES,
    USER_LOGOUT,
    USER_FAVORITES
} from "./actionTypes";
import RezzipeClient from "../const/http_instance";


// RECIPES
export const previewRecipe = (id) => async (dispatch) => {
    try {
        dispatch({ type: PREVIEW_RECIPE, payload: { preview: { loading: true } } });
        const response = await RezzipeClient.get(`/api/recipes/${id}`);
        dispatch({
            type: PREVIEW_RECIPE,
            payload: {
                preview: {
                    item: response.data,
                    loading: false,
                }
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}
export const getPopularRecipes = (searchKeyword = "chicken", type = "any") => async (dispatch) => {
    try {
        const loadingType = searchKeyword === "chicken"
            ? { loading: true }
            : { searching: true };

        dispatch({
            type: GET_POPULAR_RECIPES,
            payload: { popular: loadingType }
        });

        const response = await RezzipeClient.get("/api/recipes", { params: { searchKeyword, type } });
        if (response.data._links.next === undefined) return dispatch({
            type: GET_POPULAR_RECIPES,
            payload: {
                popular: { hasSearchResults: false }
            }
        });
        dispatch({
            type: GET_POPULAR_RECIPES,
            payload: {
                popular: {
                    loading: false,
                    searching: false,
                    hasSearchResults: true,
                    value: response.data?.hits
                },
                nextUrl: response.data._links.next.href,
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}
export const getTrendRecipes = (searchKeyword = "steak", type = "any") => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRENDING_RECIPES,
            payload: { trending: { loading: true } }
        });
        const response = await RezzipeClient.get("/api/recipes", { params: { searchKeyword, type } });
        dispatch({
            type: GET_TRENDING_RECIPES,
            payload: {
                trending: {
                    loading: false,
                    value: response.data?.hits
                },
            }
        });

    } catch (error) {
        console.log(error.message);
    }
}
export const getNextRecipes = (url) => async (dispatch) => {
    try {
        dispatch({
            type: GET_NEXT_RECIPES,
            payload: { moreRecipes: { loading: true } }
        });
        const { q: searchKeyword, type, _cont } = Object.fromEntries(new URLSearchParams(url.replace("https://api.edamam.com/api/recipes/v2?", "")));
        const response = await RezzipeClient.get("/api/recipes/next", {
            params: {
                searchKeyword,
                type,
                _cont,
            },
        });
        console.log(`from page ${response.data.from} - ${response.data.to}`)
        dispatch({
            type: GET_NEXT_RECIPES,
            payload: {
                moreRecipes: {
                    loading: false,
                    value: response.data.hits
                },
                nextUrl: response.data._links.next.href,
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

// FAVORITES
export const getFavorites = () => async (dispatch) => {
    try {
        const response = await RezzipeClient.get("/api/user/favorites");
        dispatch({
            type: USER_FAVORITES,
            payload: {
                favorites: {
                    loading: false,
                    value: response.data
                },
            }
        });
    } catch (error) {
        console.log(error.response.data.message);
    }
}
export const addToFavorites = (data) => async (dispatch) => {
    try {
        const response = await RezzipeClient.post("/api/user/favorites", data);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error.response.data.message);
    }
}
export const removeInFavorites = (recipeId) => async (dispatch) => {
    try {
        const response = await RezzipeClient.delete(`/api/user/favorites/${recipeId}`);
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: USER_FAVORITES,
            payload: {
                favorites: {
                    loading: false
                }
            }
        });
        return Promise.reject(error.response.data.message);
    }
}


// USER
export const userLogin = (data) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN, payload: { loading: true } })
        const response = await RezzipeClient.post("/api/login", data);
        dispatch({
            type: USER_LOGIN,
            payload: {
                email: response.data.email,
                loading: false,
                message: null,
                error: false
            }
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: USER_LOGIN,
            payload: {
                email: null,
                loading: false,
                message: error.response.data.message,
                error: true
            }
        });
        return Promise.reject(error.response.data.message);
    }
}
export const userRegister = (data) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER, payload: { loading: true } });
        const response = await RezzipeClient.post("/api/registration", data);
        dispatch({
            type: USER_REGISTER,
            payload: {
                email: response.data.email,
                loading: false,
                message: null,
                error: false
            }
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: USER_REGISTER,
            payload: {
                email: null,
                loading: false,
                message: error.response.data.message,
                error: true
            }
        });
        return Promise.reject(error.response.data.message);
    }
}
export const userLogout = () => async (dispatch) => {
    try {
        const response = await RezzipeClient.delete("/api/logout");
        dispatch({
            type: USER_LOGOUT,
            payload: { access: false }
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: USER_LOGOUT,
            payload: { access: true }
        });
        return Promise.reject(error.response.data.message);
    }
}
export const userAccessToken = () => async (dispatch) => {
    try {
        const response = await RezzipeClient.post("/api/token", {}, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
        dispatch({ type: USER_LOGIN, payload: { access: true } });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({ type: USER_LOGIN, payload: { access: false } });
        return Promise.reject(error.response.data.message);
    }
}