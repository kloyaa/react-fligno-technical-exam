import axios from "axios";

const RezzipeClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    // onUploadProgress: (progressEvent) => {
    //     console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    // }
});

export default RezzipeClient;