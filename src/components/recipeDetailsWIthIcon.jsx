import { Box, List, ListIcon, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

function RecipeDetailsWIthIcon({ title, content, icon }) {
    return <Box>
        <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('yellow.500', 'yellow.300')}
            fontWeight={'500'}
            textTransform={'uppercase'}
            mb={'4'}>
            {title}
        </Text>

        <List>
            {content.map(value => <ListItem
                key={value}
                fontWeight={'medium'}
                color={"gray.600"}>
                <ListIcon as={icon} color='green.500' /> {value}
            </ListItem>)}

        </List>
    </Box>;
}

export default RecipeDetailsWIthIcon 