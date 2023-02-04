import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, Routes , Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Regester";
import Profile from "./components/Profile";
import {useDispatch, useSelector, useStore} from "react-redux";
import {logoutThunk} from "./slices/auth.slice";
import {AppDispatch, RootState, useAppDispatch, useAppSelector} from "./store";
import AdminPage from "./components/AdminPage";

function App() {
    const dispatch = useAppDispatch();
    let {user: currentUser} = useSelector((state:any) => state.auth);
    let {isLoggedIn: isLoggedIn} = useAppSelector((state:RootState) => state.auth);

    const logOut = () => {
        dispatch(logoutThunk());
    };

    const showState = () => {
        alert(isLoggedIn)
    }

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
                    <li>
                       <Link to={"/admin"}>AdminPage</Link>
                    </li>
                </div>
            </nav>

            <Routes>
                <Route path = '/login' element={<Login/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/profile' element={<Profile/>} />
                <Route path = '/admin' element={<AdminPage/>} />
            </Routes>

        </BrowserRouter>
  );
}
export default App;
