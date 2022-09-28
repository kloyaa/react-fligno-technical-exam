import { Box, Wrap, WrapItem, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

function RecipeDetails({ title, content }) {
    return <Box>
        <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('yellow.500', 'yellow.300')}
            fontWeight={'500'}
            textTransform={'uppercase'}
            mb={'4'}>
            {title}
        </Text>

        <Wrap>
            {content.map((value, index) => {
                return <WrapItem key={value}>
                    <Text fontWeight={'medium'} color={"gray.600"} fontSize={"medium"}>
                        {value} {index !== content.length - 1 && <>&bull;</>}
                    </Text>
                </WrapItem>
            })}
        </Wrap>
    </Box>;
}

export default RecipeDetails;