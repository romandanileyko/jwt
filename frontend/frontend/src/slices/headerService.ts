import {IUserInfoResponse} from "../user.types";
import {AxiosRequestHeaders} from "axios";

export default function authHeader():AxiosRequestHeaders {
    const userStr = localStorage.getItem('user');
    let user:IUserInfoResponse | undefined;
    if (userStr) {
        user = JSON.parse(userStr);
    }


    if (user  && user.token) {
        return {
            Authorization: 'Bearer ' + user.token
        };
    } else {
        return { Authorization: '' };
    }
}