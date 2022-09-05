import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Profile: React.FC = () => {
    const { user: currentUser } = useSelector((state:any) => state.auth);
    let navigate = useNavigate();

    if (!currentUser) {
        navigate("/login");
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
            </header>
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.token}</strong>
                </h3>
            </header>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.authorities &&
                    currentUser.authorities.map((role:any, index:number) => <li key={index}>{role.authority}</li>)}
            </ul>
        </div>
    );
}
export default Profile;