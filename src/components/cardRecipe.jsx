import React from 'react'
import { Badge, Box, Flex, Icon, Image, Progress, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { AiFillStar, AiOutlineUser } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';
import { SyncLoader, CircleLoader, BeatLoader } from 'react-spinners';

export const CardRecipe = (props) => {
    const { imageUrl, cuicineTpye, mealType, title, rating, reviewCount, handlePreview, isSelected, width } = props;

    return <Tooltip label={title} aria-label={title} hasArrow>
        <Box
            width={width}
            borderRadius='lg'
            overflow='hidden'
            onClick={handlePreview}>
            <Image
                src={imageUrl}
                alt={imageUrl}
                width={width}
                objectFit={'cover'}
                fallbackSrc='https://via.placeholder.com/350' />

            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                    <Wrap>
                        {cuicineTpye?.map(value => {
                            return <WrapItem key={uuidv4()}>
                                <Box
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    textTransform='uppercase'  >
                                    {value}
                                </Box>
                            </WrapItem>
                        })}
                    </Wrap>
                </Box>

                <Text
                    mt='1'
                    fontWeight='semibold'
                    lineHeight='tight'
                    fontSize='medium'
                    noOfLines={1}>{title}</Text>


                <Box display='flex' mt='2' alignItems='center' justifyContent={"space-between"}>
                    <Box>
                        <Icon as={AiFillStar} h={3} color={"orange.500"} />
                        <Icon as={AiFillStar} h={3} color={"orange.500"} />
                        <Icon as={AiFillStar} h={3} color={"orange.500"} />
                        <Icon as={AiFillStar} h={3} color={"orange.500"} />
                        <Icon as={AiFillStar} h={3} color={"orange.500"} />
                    </Box>
                    {isSelected ?
                        <BeatLoader color='#ED64A6' size={8} /> :
                        <Flex>
                            <Icon as={AiOutlineUser} h={3} />
                            <Box color='gray.600' fontSize='xs' fontWeight={"bold"} lineHeight={"1"}> {reviewCount} </Box>
                        </Flex>}

                </Box>
            </Box>
        </Box>
    </Tooltip>
}
