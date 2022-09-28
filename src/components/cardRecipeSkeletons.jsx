import { Box, Flex, Skeleton, WrapItem } from '@chakra-ui/react'
import React from 'react'

function CardRecipeSkeletons({ count }) {
    return [...Array(count).keys()].map(v => <WrapItem key={v}>
        <Flex direction={"column"} width={'200px'}>
            <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600'>
                <Box height={"200"} width={"200px"} ></Box>
            </Skeleton>
            <Skeleton borderRadius={"lg"} mt={"7"} startColor='pink.300' endColor='pink.600' width={"120px"}>
                <Box height={"20px"} ></Box>
            </Skeleton>
            <Skeleton borderRadius={"lg"} mt={"1"} startColor='pink.300' endColor='pink.600'>
                <Box height={"20px"} width={"200px"} ></Box>
            </Skeleton>
            <Flex mt={"3"} height={"20px"}>
                <Skeleton borderRadius={"lg"} mr={"2"} startColor='pink.300' endColor='pink.600'>
                    <Box width={"120px"} ></Box>
                </Skeleton>
                <Skeleton borderRadius={"lg"} startColor='pink.300' endColor='pink.600'>
                    <Box width={"80px"} ></Box>
                </Skeleton>
            </Flex>
        </Flex>
    </WrapItem>);
}

export default CardRecipeSkeletons