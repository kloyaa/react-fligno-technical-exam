import React, { useEffect, useState } from 'react'
import { Link, ScrollRestoration, useLoaderData, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import {
    Box,
    Container,
    Stack,
    Image,
    Flex,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    Wrap,
    WrapItem,
    Icon,
    Text,
    Skeleton,
    useToast,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { IoIosClose } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Footer from '../components/footer';
import RecipeDetails from '../components/recipeDetails';
import RecipeDetailsWIthIcon from '../components/recipeDetailsWIthIcon';
import RecipeDetailsWithBadge from '../components/recipeDetailsWithBadge';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, previewRecipe, removeInFavorites, userAccessToken } from '../redux/actions';
import { v4 as uuidV4 } from 'uuid';
import RezzipeClient from '../const/http_instance';

const APP_TITLE = process.env.REACT_APP_TITLE;

function PreviewRecipe() {
    const preview = useSelector((state) => state.global.preview);
    const user = useSelector((state) => state.global.user);
    const [inFavorites, setInfavorites] = useState(null);

    const params = useParams();
    const dispatch = useDispatch();

    const toast = useToast();
    const borderColorMode = useColorModeValue('gray.200', 'gray.600');

    const handleCheckIfFavExist = async (id) => {
        const response = await RezzipeClient.get(`/api/user/favorites/${id}`);
        setInfavorites(response.data !== null);
    }

    const handleAddToFavorties = async (data) => {
        const response = new Promise((resolve, reject) => {
            dispatch(addToFavorites(data))
                .then(v => resolve(v))
                .catch(err => reject(err))
        });
        await response
            .then((_) => {
                setInfavorites(true);
                toast({
                    title: "Added to favorites",
                    status: "success",
                    position: "bottom-right"
                });
            })
            .catch(err => console.log(err));
    }

    const handleRemoveInFavorites = async (id) => {
        const response = new Promise((resolve, reject) => {
            dispatch(removeInFavorites(id))
                .then(v => resolve(v))
                .catch(err => reject(err))
        });
        await response
            .then((v) => {
                setInfavorites(false);
                toast({
                    title: "Removed in favorites",
                    status: "error",
                    position: "bottom-right"
                });
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(previewRecipe(params.reference));
        dispatch(userAccessToken()).then(() => {
            handleCheckIfFavExist(params.reference);
        });
        window.document.title = APP_TITLE;
    }, [dispatch]);

    return <>
        <Flex justify={"end"} alignItems={"center"} px={10} mt={5}>
            {user.access && preview.item?.recipe && <Icon
                onClick={inFavorites ?
                    () => handleRemoveInFavorites(params.reference) :
                    () => handleAddToFavorties({
                        recipeId: params.reference,
                        recipePhoto: preview?.item.recipe.image
                    })}
                cursor={"pointer"}
                as={inFavorites ? AiFillHeart : AiOutlineHeart}
                height={14}
                width={14}
                color={"red.400"}></Icon>}
            <Box cursor={"pointer"} >
                <Link to={-1} preventScrollReset={true}>
                    <Icon as={IoIosClose} height={20} width={20} color={"gray.600"}></Icon>
                </Link>
            </Box>
        </Flex>

        {!preview.item?.recipe ?
            <PreviewRecipeSkeleton /> :
            <Container maxW={'7xl'} mb={'56'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 0 }}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={preview.item.recipe.image}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}>
                                {preview?.item?.recipe?.label}
                            </Heading>
                        </Box>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={<StackDivider borderColor={borderColorMode} />}>

                            <RecipeDetailsWithBadge title={"Cuisine type"} content={preview.item.recipe.cuisineType} />
                            <RecipeDetailsWIthIcon title={"Ingredients"} content={preview.item.recipe.ingredientLines} icon={MdCheckCircle} />
                            <RecipeDetails title={"Health labels"} content={preview.item.recipe.healthLabels} />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container >
        }

        <ScrollRestoration getKey={(location, matches) => location.pathname} />
        <Footer title={process.env.REACT_APP_TITLE} />
    </>;
}
function PreviewRecipeSkeleton() {
    return <Container mb={"56"}>
        <Flex justify={"center"}>
            <Skeleton borderRadius={"lg"} mr={"2"} startColor='pink.300' endColor='pink.600'>
                <Box width={"600px"} h={"300px"}></Box>
            </Skeleton>
            <Box>
                <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600'>
                    <Box width={"400px"} height={"50px"}></Box>
                </Skeleton>
                <Flex mt={"10"}>
                    <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600'>
                        <Box width={"200px"} height={"30px"}></Box>
                    </Skeleton>
                </Flex>
                <Flex mt={"2"}>
                    {[...Array(5)].map(_ => <Skeleton key={uuidV4()} borderRadius={"lg"} startColor='pink.300' endColor='pink.600' mr={2}>
                        <Box width={"70px"} height={"20px"}></Box>
                    </Skeleton>)}
                </Flex>


                <Flex mt={"10"}>
                    <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600'>
                        <Box width={"200px"} height={"30px"}></Box>
                    </Skeleton>
                </Flex>
                <Flex mt={"2"} direction={"column"}>
                    {[...Array(5)].map(_ => {
                        return <Flex key={uuidV4()}>
                            <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600' mt={2} mr={"2"}>
                                <Box width={"20px"} height={"20px"}></Box>
                            </Skeleton>
                            <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600' mt={2}>
                                <Box width={"300px"} height={"20px"} ></Box>
                            </Skeleton>
                        </Flex>
                    })}
                </Flex>

                <Flex mt={"10"}>
                    <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600'>
                        <Box width={"200px"} height={"30px"}></Box>
                    </Skeleton>
                </Flex>
                <Flex mt={"2"}>
                    <Wrap>
                        {[...Array(20)].map(_ => <WrapItem key={uuidV4()}>
                            <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600' mr={2}>
                                <Box width={"70px"} height={"20px"}></Box>
                            </Skeleton>
                        </WrapItem>)}
                    </Wrap>
                </Flex>
            </Box>
        </Flex >
    </Container >;
}
export default PreviewRecipe