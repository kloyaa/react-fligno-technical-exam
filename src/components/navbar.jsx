import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    InputGroup,
    InputLeftElement,
    Input,
    Spacer,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { AiOutlineSearch } from "react-icons/ai";
import { Link as RouteLink, Route } from "react-router-dom";
import { ClimbingBoxLoader } from 'react-spinners';

export default function Navbar(props) {
    const { title, onSearch, onReset, onLogout, onOpenFavorites, isAuthenticated, searchRef } = props;
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box >
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

                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'} />
                </Flex>
                <Flex flex={{ base: 0 }} justify={{ base: 'center', md: 'start' }} align={"center"}>
                    <Text
                        display={{ base: 'none', md: 'flex' }}
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontWeight={'black'}
                        cursor={'pointer'}
                        onClick={onReset}>
                        {title}
                    </Text>
                </Flex>
                <Flex mx={{ base: "0", md: "20", lg: "20" }} w={{ base: "full", md: "50%", lg: "50%" }}>
                    <InputGroup mr={"2"}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<AiOutlineSearch color='gray.300' />} />
                        <Input ref={searchRef} type='text' placeholder='Search recipes...' />
                    </InputGroup>
                    <Button
                        // display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'pink.400'}
                        _hover={{ bg: 'pink.300' }}
                        leftIcon={<AiOutlineSearch />}
                        onClick={onSearch}>
                        Search
                    </Button>
                </Flex>
                <Spacer />
                <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                    <DesktopNav authenticated={isAuthenticated} logout={() => onLogout()} />
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav authenticated={isAuthenticated} logout={() => onLogout()} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = ({ authenticated, logout }) => {
    const hoverColor = useColorModeValue('pink.50', 'gray.900');
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    return (
        <Stack direction={'row'} spacing={4}>
            {authenticated ?
                <Box>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger >
                            <Text
                                p={2}
                                fontSize={'sm'}
                                fontWeight={500}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor
                                }}>
                                Account
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent
                            border={0}
                            boxShadow={'xl'}
                            bg={popoverContentBgColor}
                            p={4}
                            rounded={'xl'}
                            minW={'sm'}>
                            <Stack>
                                <Box
                                    role={'group'}
                                    display={'block'}
                                    p={2}
                                    rounded={'md'}
                                    _hover={{ bg: hoverColor }}>
                                    <RouteLink to="/favorites">
                                        <Stack direction={'row'} align={'center'}>
                                            <Box>
                                                <Text
                                                    transition={'all .3s ease'}
                                                    _groupHover={{ color: 'pink.400' }}
                                                    fontWeight={500}>
                                                    Favorites
                                                </Text>
                                                <Text fontSize={'sm'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                                            </Box>
                                            <Flex
                                                transition={'all .3s ease'}
                                                transform={'translateX(-10px)'}
                                                opacity={0}
                                                _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                                                justify={'flex-end'}
                                                align={'center'}
                                                flex={1}>
                                                <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                                            </Flex>
                                        </Stack>
                                    </RouteLink>
                                </Box>
                            </Stack>
                            <Stack>
                                <Box
                                    role={'group'}
                                    display={'block'}
                                    p={2}
                                    rounded={'md'}
                                    _hover={{ bg: hoverColor }}>
                                    <Stack direction={'row'} align={'center'}>
                                        <Box onClick={() => logout()}>
                                            <Text
                                                transition={'all .3s ease'}
                                                _groupHover={{ color: 'pink.400' }}
                                                fontWeight={500}>
                                                Sign out
                                            </Text>
                                            <Text fontSize={'sm'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                                        </Box>
                                        <Flex
                                            transition={'all .3s ease'}
                                            transform={'translateX(-10px)'}
                                            opacity={0}
                                            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                                            justify={'flex-end'}
                                            align={'center'}
                                            flex={1}>
                                            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                                        </Flex>
                                    </Stack>
                                </Box>
                            </Stack>
                        </PopoverContent>
                    </Popover>
                </Box> :
                DEFAULT_NAV_ITEMS.map((navItem) => <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Text
                                p={2}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor
                                }}>
                                {navItem.label}
                            </Text>
                        </PopoverTrigger>
                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>)
            }
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel, path }) => {
    return (
        <RouteLink
            to={path}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </RouteLink>
    );
};

const MobileNav = ({ authenticated }) => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {/* {authenticated ?
                AUTHORIZED_NAV_ITEMS.map((navItem) => <MobileNavItem key={navItem.label} {...navItem} />) :
                DEFAULT_NAV_ITEMS.map((navItem) => <MobileNavItem key={navItem.label} {...navItem} />)
            } */}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};


const DEFAULT_NAV_ITEMS = [
    {
        label: 'Get Started',
        children: [
            {
                label: 'Sign in',
                subLabel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                path: '/login',
            },
            {
                label: 'Create an account',
                subLabel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                path: '/registration',
            }
        ]
    },
];

