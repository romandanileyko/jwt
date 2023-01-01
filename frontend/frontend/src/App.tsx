import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, Routes , Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Regester";
import Profile from "./components/Profile";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./services/auth.service";
import EventBus from "./common/EventBus";
import {loginThunk, logoutThunk} from "./slices/auth.slice";

function App() {
    const dispatch = useDispatch<any>();
    const {user: currentUser} = useSelector((state:any) => state.auth)
    const logOut = useCallback(() => {
        dispatch(logoutThunk());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });
        return () => {
            EventBus.remove("logout", () =>{});
        };
    }, [logOut]);

    // useEffect(() => {
    //     EventBus.on("logout", () => {
    //         logOut();
    //     });
    //     return () => {
    //         EventBus.remove("logout", () => {});
    //     };
    // },[logOut]);

    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        {Object.keys(currentUser).length === 0 && <Link to = {"/login"}> Login </Link>}
                    </li>
                    <li className="nav-item">
                        <Link to = {"/register"} > Sign Up </Link>
                    </li>
                    <li>
                        {Object.keys(currentUser).length !== 0 && <a href="/login" className="nav-item" onClick={logOut}>LogOut</a>}
                    </li>
                </div>
            </nav>

            <Routes>
                <Route path = '/login' element={<Login/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/profile' element={<Profile/>} />
            </Routes>

        </BrowserRouter>
  );
}
export default App;
