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
import { userRegister } from '../redux/actions';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { passwordPattern } from '../const/pattern';
import img from "../images/image.jpg";

function Registration() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const user = useSelector((state) => state.global.user);
    const [togglePassword, setTogglePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onRegister = async data => {
        const register = new Promise((resolve, reject) => {
            dispatch(userRegister(data))
                .then(v => resolve(v))
                .catch(err => reject(err))
        });
        await register
            .then((v) => navigate("/", { replace: true }))
            .catch(err => console.log(err));
    };


    window.document.title = `Sign up | ${process.env.REACT_APP_TITLE}`;
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <form onSubmit={handleSubmit(onRegister)}>
                    <Stack spacing={4} width={{ base: "full", md: "500px", lg: "500px" }}>
                        <Heading fontSize={'2xl'}>Create your account</Heading>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                {...register("email")}
                                isInvalid={user.error}
                                errorBorderColor='crimson' />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={togglePassword ? 'text' : 'password'}
                                    {...register("password", {
                                        pattern: {
                                            value: passwordPattern,
                                            message: "Password must contain at least 1 special, 1 upper case and minimum length of 10 characters",
                                        }
                                    })}
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
                        {errors.password && <Text color={"red"}>{errors.password.message}</Text>}
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.500'}>Forgot password?</Text>
                            </Stack>
                            <Button colorScheme={'pink'} variant={'solid'} type={"submit"} isLoading={isSubmitting}>
                                Sign up
                            </Button>
                            <Button variant={'solid'}>
                                <Link to="/login">
                                    Already have an account?
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

export default Registration;