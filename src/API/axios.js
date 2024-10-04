import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000",
    // deployed backend url on render
    baseURL: "https://amazon-backend-vwar.onrender.com",
})

export {axiosInstance}