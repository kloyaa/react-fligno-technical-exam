import React, { useEffect } from 'react'
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { Button, Textarea, Text, Box, Flex } from '@chakra-ui/react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosSend } from "react-icons/io"
import { useRef } from 'react';
import RezzipeClient from '../const/http_instance';

const TEMP_CURRENT_USERID = "6333ade25a31a2c1f3043745";
const TEMP_CONV_ID = "6333ae484b7b0ddee604772e";


function Conversation() {
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();

    const [conversation, setConversation] = useState([]);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);

    const scrollRef = useRef();

    const onSendMessage = async ({ message }) => {
        const response = await RezzipeClient.post("/api/user/conversation/message", {
            "text": message
        });
        setMessages(prev => [...prev, response.data]);
        setValue("message", "");
    }

    useEffect(() => {
        (async () => {
            const response = await RezzipeClient.get("/api/user/conversation/own");
            setConversation(response.data);
            console.log(response.data)
        })();
        (async () => {
            const response = await RezzipeClient.get(`/api/user/conversation/${TEMP_CONV_ID}`);
            setMessages(response.data)
            console.log(response.data)
        })();

    }, []);

    useEffect(() => {
        scrollTo(scrollRef)
    }, [messages])

    function scrollTo(ref) {
        if (!ref.current) return;
        ref.current.scrollIntoView({ behavior: "smooth" });
    }

    dayjs.extend(relativeTime);
    return <React.Fragment>
        <Box maxH={"80vh"} overflowY={"scroll"}>
            {messages?.map((value) => {
                return <Box key={value._id} mx={"20"} my={"10"} ref={scrollRef}>
                    <Flex justify={value.sender === "admin" ? "start" : "end"}>
                        <Box>
                            <Text color={value.sender === "admin" ? "blue" : "black"} fontWeight={"medium"}>{value.text}</Text>
                            <Text color={"blackAlpha.700"} fontSize={"sm"}> {dayjs(value.createdAt).fromNow('s')} </Text>
                        </Box>
                    </Flex>
                </Box>
            })}
        </Box>
        <Box mx={"20"}>
            <form onSubmit={handleSubmit(onSendMessage)} >
                <Textarea
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    resize={"vertical"}
                    {...register("message", { required: true })} />
                <Button
                    isLoading={isSubmitting}
                    leftIcon={<IoIosSend />}
                    colorScheme={'pink'}
                    mt={"10"}
                    variant={'solid'}
                    type={"submit"}>
                    Send
                </Button>
            </form>
        </Box>
    </React.Fragment>
}

export default Conversation