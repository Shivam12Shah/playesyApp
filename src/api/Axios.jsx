import axios  from "axios";

const Axios = axios.create({
    baseURL: "http://10.0.2.2:3000",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
});

module.exports = Axios;