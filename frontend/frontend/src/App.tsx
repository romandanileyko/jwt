import React from 'react';
import {BrowserRouter, Routes , Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Regester";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
        <BrowserRouter>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to = {"/login"}> Login </Link>
                    </li>

                    <li className="nav-item">
                        <Link to = {"/register"} > Sign Up </Link>
                    </li>
                </div>
            </nav>

            <Routes>
                <Route path = '/login' element={<Login/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/profile' element={<Profile/>} />
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
