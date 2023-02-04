import axios from "axios";
import authHeader from "../slices/headerService";
const API_URL = "http://localhost:8081/api/test/";

export const getUserArea = () => {
    return axios.get(API_URL + "user", {headers: authHeader()});
};

export const getPmArea = () => {
    return axios.get(API_URL + "pm", {headers: authHeader()});
};

export const getAdminArea = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()});
};
