import { USER_LOGIN, PREVIEW_RECIPE, GET_POPULAR_RECIPES, GET_TRENDING_RECIPES, GET_NEXT_RECIPES, USER_LOGOUT, USER_FAVORITES, USER_REGISTER } from "./actionTypes";

const initialState = {
    recipes: {
        trending: {
            loading: false,
            value: []
        },
        popular: {
            loading: false,
            searching: false,
            hasSearchResults: true,
            value: []
        },
        moreRecipes: {
            loading: false,
        },
        nextUrl: "",
    },
    user: {
        loading: false,
        error: false,
        email: null,
        message: null,
        access: false,
        favorites: {
            loading: false,
            value: []
        }
    },
    preview: {
        loading: false,
        item: null,
    },
    search: {
        loading: false,
        keyword: null,
        empty: false,
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PREVIEW_RECIPE:
            return {
                ...state,
                preview: {
                    item: action.payload.preview.item,
                    loading: action.payload.preview.loading
                },
            }
        case GET_TRENDING_RECIPES:
            return {
                ...state,
                recipes: {
                    ...state.recipes,
                    trending: {
                        value: action.payload.trending.value,
                        loading: action.payload.trending.loading
                    },
                }
            }
        case GET_POPULAR_RECIPES:
            return {
                ...state,
                recipes: {
                    ...state.recipes,
                    popular: {
                        value: action.payload.popular.value,
                        loading: action.payload.popular.loading,
                        searching: action.payload.popular.searching,
                        hasSearchResults: action.payload.popular.hasSearchResults
                    },
                    nextUrl: action.payload.nextUrl,
                }
            }
        case GET_NEXT_RECIPES:
            if (!action.payload.moreRecipes.loading) {
                const combinedArr = [...state.recipes.popular.value, ...action.payload.moreRecipes.value];
                const combinedRecipes = [...new Map(combinedArr.map((m) => [m.recipe.label, m])).values()];
                return {
                    ...state,
                    recipes: {
                        ...state.recipes,
                        popular: {
                            ...state.recipes.popular,
                            value: combinedRecipes
                        },
                        moreRecipes: { loading: action.payload.moreRecipes.loading },
                        nextUrl: action.payload.nextUrl,
                    }
                }
            }
            return {
                ...state,
                recipes: {
                    ...state.recipes,
                    moreRecipes: { loading: action.payload.moreRecipes.loading },
                }
            }
        case USER_FAVORITES:
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: {
                        loading: action.payload.favorites.loading,
                        value: action.payload.favorites.value
                    }
                }
            }
        case USER_LOGIN:
            return {
                ...state,
                user: {
                    loading: action.payload.loading,
                    error: action.payload.error,
                    email: action.payload.email,
                    message: action.payload.message,
                    access: action.payload.access,
                }
            }
        case USER_REGISTER:
            return {
                ...state,
                user: {
                    loading: action.payload.loading,
                    error: action.payload.error,
                    email: action.payload.email,
                    message: action.payload.message,
                    access: action.payload.access,
                }
            }
        case USER_LOGOUT:
            return {
                ...state,
                user: {
                    access: action.payload.access,
                }
            }
        default:
            return initialState;
    }
}