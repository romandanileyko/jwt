import axios from "axios";
import {array} from "yup";

const API_URL = "http://localhost:8081/api/auth/";

export const register = (username: string, email: string, password: string, role: string[]) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
        role,
    });
};

export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};
