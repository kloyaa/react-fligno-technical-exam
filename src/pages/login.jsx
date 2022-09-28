import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    InputRightElement,
    InputGroup,
    Text
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import img from "../images/image.jpg";

function Login() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const user = useSelector((state) => state.global.user);
    const [togglePassword, setTogglePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = async data => {
        const login = new Promise((resolve, reject) => {
            dispatch(userLogin(data))
                .then(v => resolve(v))
                .catch(err => reject(err))
        });
        await login
            .then((v) => navigate("/", { replace: true }))
            .catch(err => console.log(err));
    };

    window.document.title = `Login | ${process.env.REACT_APP_TITLE}`;
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <form onSubmit={handleSubmit(onLogin)}>
                    <Stack spacing={4} width={{ base: "full", md: "500px", lg: "500px" }}>
                        <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                {...register("email", { required: true })}
                                isInvalid={user.error}
                                errorBorderColor='crimson' />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={togglePassword ? 'text' : 'password'}
                                    {...register("password", { required: true })}
                                    isInvalid={user.error}
                                    errorBorderColor='crimson' />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => setTogglePassword(!togglePassword)}>
                                        {togglePassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        {user.message && <Text color={"red"}>{user.message}</Text>}
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.500'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                isLoading={isSubmitting}
                                colorScheme={'pink'}
                                variant={'solid'}
                                type={"submit"}>
                                Sign in
                            </Button>
                            <Button variant={'solid'}>
                                <Link to="/registration">
                                    Not yet registered?
                                </Link>
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={img}
                    maxH={"100vh"}
                    w={"full"} />
            </Flex>
        </Stack >
    );
}

export default Login;