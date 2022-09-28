import React from 'react'
import { Wrap, WrapItem, Image, Flex, useColorModeValue, useBreakpointValue, Text, Icon, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, userAccessToken } from '../redux/actions';
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import imgEmptyBasket from "../images/image-empty-basket.png"

const APP_TITLE = process.env.REACT_APP_TITLE;

function Favorites() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state) => state.global.user.favorites);

    const handlePreview = (id) => {
        navigate(`/${id}`, { preventScrollReset: true });
    };

    useEffect(() => {
        dispatch(userAccessToken()).then(() => {
            dispatch(getFavorites());
        });
        window.document.title = "Favorites | " + APP_TITLE;
    }, [])

    return <React.Fragment>
        <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2, md: 5, lg: 5 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}>
            <Link to="/" preventScrollReset={true}>
                <Flex cursor={'pointer'} align={'center'}>
                    <Icon as={FiChevronLeft} mr={"2"}></Icon>
                    <Text
                        display={{ base: 'none', md: 'flex' }}
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontWeight={'black'}>
                        {APP_TITLE}
                    </Text>
                </Flex>

            </Link>
        </Flex>
        {!favorites?.value.length && <Flex justify={"center"} align={"center"}>
            <Image
                src={imgEmptyBasket}
                width={"550px"}
                alt={"Empty Favorites"}
                mt={"32"} />
        </Flex>}
        <Box px={{ base: "0", md: "10", lg: "20" }} mt={"20"}>
            <Wrap justify={{ base: "center", md: "center", lg: "start" }} spacing={'5'} mt={'5'} mb={"20"}>
                {favorites?.value.map((value) => {
                    const recipeId = value.recipeId;
                    return <WrapItem
                        key={value._id}
                        transitionTimingFunction={'ease-in-out'}
                        transition={'0.3s'}
                        shadow={'lg'}
                        _hover={{
                            boxShadow: "2xl",
                            transition: "0.3s",
                            transitionTimingFunction: "ease-in-out"
                        }}
                        onClick={() => handlePreview(recipeId)}>
                        <Image
                            borderRadius={"md"}
                            cursor={"pointer"}
                            src={value.recipePhoto}
                            alt={value.recipePhoto}
                            width={"250px"}
                            objectFit={'cover'}
                            fallbackSrc='https://via.placeholder.com/350' />
                    </WrapItem>
                })}
            </Wrap>
        </Box>


    </React.Fragment >
}

export default Favorites;