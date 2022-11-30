import { Formik, Field, Form, ErrorMessage  } from "formik";
import React, { useState } from "react";
import {loginThunk} from "../slices/auth.slice";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {isLoggedIn} = useSelector((state:any) => state.auth)
    const { message} = useSelector((state: any) => state.message);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;

        setLoading(true);

         //@ts-ignore
        dispatch(loginThunk({username, password}))
            .unwrap()
            .then(() => {
                navigate("/profile")
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Login;