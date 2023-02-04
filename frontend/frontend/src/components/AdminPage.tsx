import React, {useState, useEffect} from "react";
import {getAdminArea} from "../services/api.service";
import {AxiosError, AxiosResponse} from "axios";

const AdminPage = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        getAdminArea().then(
            (response:AxiosResponse<string>) => {
                setContent(response.data);
                console.log(response);
            },
            (error:AxiosError) => {
                console.log(error);
            }
        )
    },[]);
    return (
        <div className="container">
            <p>{content}</p>
        </div>
    )
}
export default AdminPage;