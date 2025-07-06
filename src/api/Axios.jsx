import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const Axios = axios.create({
    baseURL: Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, authorization",
    },
});

Axios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        console.log("token=======", token);
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


module.exports = Axios;