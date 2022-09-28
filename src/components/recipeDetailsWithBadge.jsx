import { Badge, Box, useColorModeValue, Wrap, WrapItem, Text } from '@chakra-ui/react'
import React from 'react'

function RecipeDetailsWithBadge({ content, title }) {
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
            {content?.map((value, index) => {
                return <WrapItem key={index}>
                    <Badge colorScheme='pink'>{value}</Badge>
                </WrapItem>
            })}
        </Wrap>
    </Box>
}

export default RecipeDetailsWithBadge