import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollToTop from 'react-scroll-to-top';
import CardRecipeSkeletons from '../components/cardRecipeSkeletons';
import ProgressLoading from '../components/progressLoading';
import { Box, Button, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { CardRecipe } from '../components/cardRecipe';
import { ScrollRestoration, useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendRecipes, getNextRecipes, getPopularRecipes, userAccessToken, userLogout } from '../redux/actions';
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { BeatLoader } from 'react-spinners';
import { IoIosHome } from "react-icons/io";

const APP_TITLE = process.env.REACT_APP_TITLE;

function Home() {
    const recipes = useSelector((state) => state.global.recipes);
    const user = useSelector((state) => state.global.user);
    const { trending, popular } = recipes;
    const [selectedRecipe, setSelectedRecipe] = useState("");
    const [searchKeyword, setSearchKeyword] = useState(null);

    const navigation = useNavigation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchRef = useRef(null);

    const handlePreview = (id) => {
        setSelectedRecipe(id);
        navigate(`/${id}`, { preventScrollReset: true });
    };
    const handleLoadMore = () => dispatch(getNextRecipes(recipes.nextUrl));

    const handleSearch = () => {
        setSearchKeyword(searchRef.current.value);
        if (searchRef.current.value !== "") return dispatch(getPopularRecipes(searchRef.current.value));
        dispatch(getPopularRecipes());
    };

    const handleResetPage = () => {
        setSearchKeyword(null);
        dispatch(getPopularRecipes());
        dispatch(getTrendRecipes());
    };
    const handleLogout = async () => {
        document.cookie = 'accessToken=;refreshToken=; Max-Age=0;secure;path=/;';
        const logout = new Promise((resolve, reject) => {
            dispatch(userLogout())
                .then(v => resolve(v))
                .catch(err => reject(err))
        });
        await logout
            .then((v) => navigate("/", { replace: true }))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (!trending?.value?.length && !popular?.value?.length) {
            dispatch(getPopularRecipes());
            dispatch(getTrendRecipes());
        }
        dispatch(userAccessToken());
        window.document.title = process.env.REACT_APP_TITLE;
    }, []);


    const pageNotReady = !trending?.value?.length && !popular?.value?.length;
    return pageNotReady ?
        <ProgressLoading /> :
        <React.Fragment>
            <Navbar
                searchRef={searchRef}
                title={APP_TITLE}
                onReset={() => handleResetPage()}
                onSearch={() => handleSearch(searchRef.current.value)}
                onLogout={() => handleLogout()}
                isAuthenticated={user.access} />
            <Loading />

            {!popular.hasSearchResults && !popular.searching && !popular.loading && <SearchResultEmpty />}
            {popular.searching ?
                <SearchingRecipes /> :
                <BottomScrollListener onBottom={pageNotReady ? () => { } : () => handleLoadMore()}>
                    {!searchKeyword && <Box px={{ base: "0", md: "10", lg: "20" }} mt={"20"}>
                        <ContentTitle title={"Recipe of the month"} />
                        <Wrap justify={{ base: "center", md: "center", lg: "start" }} spacing={'5'} mt={'5'} mb={"20"}>
                            {trending?.loading ?
                                <CardRecipeSkeletons count={5} /> :
                                trending?.value?.map((value, index) => {
                                    const recipe = value.recipe;
                                    const cuisineType = recipe.cuisineType.filter((item, pos) => recipe.cuisineType.indexOf(item) === pos);
                                    const mealType = recipe.mealType;
                                    const uri = recipe.uri;
                                    const recipeId = uri.substring(uri.indexOf("_") + 1, uri.length);
                                    if (index <= 5)
                                        return <WrapItem
                                            key={value.recipe.label}
                                            cursor={'pointer'}
                                            transitionTimingFunction={'ease-in-out'}
                                            transition={'0.3s'}
                                            shadow={'lg'}
                                            _hover={{
                                                boxShadow: "2xl",
                                                transition: "0.3s",
                                                transitionTimingFunction: "ease-in-out"
                                            }}>
                                            <CardRecipe
                                                isSelected={selectedRecipe === recipeId}
                                                imageUrl={value.recipe.images.REGULAR.url}
                                                title={value.recipe.label}
                                                cuicineTpye={cuisineType}
                                                mealType={mealType}
                                                width={{ base: "300px", md: "200px", lg: "200px" }}
                                                handlePreview={() => handlePreview(recipeId)}
                                                reviewCount={(Math.floor(Math.random() * 10000) + 1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} />
                                        </WrapItem>

                                    return null;
                                })}
                        </Wrap>
                    </Box>}
                    {popular?.value?.length && <Box px={{ base: "0", md: "10", lg: "20" }} mt={"20"}>
                        <ContentTitle title={"Popular recipes"} />
                        <Wrap justify={{ base: "center", md: "center", lg: "start" }} spacing={'5'} mt={'5'} mb={"20"}>
                            {popular.loading ?
                                <CardRecipeSkeletons count={20} /> :
                                popular?.value?.map((value, index) => {
                                    const recipe = value.recipe;
                                    const cuisineType = recipe.cuisineType.filter((item, pos) => recipe.cuisineType.indexOf(item) === pos);
                                    const mealType = recipe.mealType;
                                    const uri = recipe.uri;
                                    const recipeId = uri.substring(uri.indexOf("_") + 1, uri.length);
                                    return <WrapItem
                                        key={index}
                                        cursor={'pointer'}
                                        transitionTimingFunction={'ease-in-out'}
                                        transition={'0.3s'}
                                        shadow={'lg'}
                                        _hover={{
                                            boxShadow: "2xl",
                                            transition: "0.3s",
                                            transitionTimingFunction: "ease-in-out"
                                        }}>
                                        <CardRecipe
                                            isSelected={selectedRecipe === recipeId}
                                            imageUrl={value.recipe.images.REGULAR.url}
                                            title={value.recipe.label}
                                            cuicineTpye={cuisineType}
                                            mealType={mealType}
                                            width={{ base: "300px", md: "200px", lg: "200px" }}
                                            handlePreview={() => handlePreview(recipeId)}
                                            reviewCount={(Math.floor(Math.random() * 10000) + 1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} />
                                    </WrapItem>
                                })}
                            {recipes.moreRecipes.loading && <CardRecipeSkeletons count={20} />}
                        </Wrap>
                    </Box>}
                </BottomScrollListener>
            }
            <ScrollToTop style={{ boxShadow: "none" }} smooth />
            <ScrollRestoration getKey={(location, matches) => location.pathname} />
            <Footer title={APP_TITLE} />
        </React.Fragment>;

    function Loading() {
        return navigation.state === "loading" && <ProgressLoading />;
    };
    function ContentTitle({ title }) {
        return <Flex>
            <Text
                fontSize={"2xl"}
                fontWeight={"normal"}
                color={"gray.500"}>{title}
            </Text>
        </Flex>;
    };
    function SearchResultEmpty() {
        return <Box width={"full"} textAlign={"center"} p={{ base: "20", md: "52", lg: "52" }}>
            <Text fontSize={{ base: "md", md: "2xl", lg: "2xl" }}>We apologize, but the term you typed for '{searchKeyword}' did not  produce any results.</Text>
            <Button mt={10} leftIcon={<IoIosHome />} onClick={() => handleResetPage()}>Go back to home</Button>
        </Box>;
    };
    function SearchingRecipes() {
        return <Flex justify={"center"}>
            <Box p={"60"}>
                <BeatLoader color='#ED64A6' size={30} />
            </Box>
        </Flex>;
    };
}


export default Home