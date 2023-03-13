import React, { useState, useEffect } from 'react'

import { Button } from 'rsuite';
import { Link, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useSelector, useDispatch } from 'react-redux';
import { resultVerificar } from '../../../../actions/login'
import { getDataUser } from '../../../../actions/dataUser';
import { respuestaLogin } from '../../../../actions/login';
import { useSpring, animated } from "react-spring";

import "./login.css";

export default function Login() {

    const dispatch = useDispatch();

    const fadeOut = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 100,
    });

    const [visible, setVisible] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);

    const token = useSelector((state) => state.reducerLogin.user_data);
    const dataUser = useSelector((state) => state.reducerDataUser.data);
    const logindataUser = useSelector((state) => state.reducerRespuestaLogin.data);
    const userLogin = localStorage.getItem('token');

    const [login, setLogin] = useState({
        nameuser: '',
        clave: ''
    });

    const handleChange = () => {
        setVisible(!visible);
    };

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmitLogin();
        }
    }

    const handleLogin = (e) => {
        setErrorLogin(false);
        setLoadingButton(false);
        localStorage.removeItem("dataToken");

        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmitLogin = () => {
        setLoadingButton(true);
        const user = {
            username: login.nameuser,
            password: login.clave
        }
        dispatch(resultVerificar(user));
    }

    const dataToken = localStorage.getItem("dataToken");

    useEffect(() => {
        if (logindataUser != null) {
            if (logindataUser == true && dataUser != null && userLogin != null) {
                setErrorLogin(false);
                setLoadingButton(false);
            }
            if (logindataUser == false && dataToken == "esta todo mal") {
                dispatch(respuestaLogin(null));
                setErrorLogin(true);
                setLoadingButton(false);
            }
        }
    }, [logindataUser, dataUser])

    //RUTAS LOGIN
    if (dataUser && userLogin != null) {
        if (dataUser.data.rol == "Admin") {
            return (
                <>
                    <Routes>
                        <Route path="/" element={<Navigate to="/panel-admin" />} />
                    </Routes>
                </>
            );
        }
        if (dataUser.data.rol != "Admin") {
            return (
                <>
                    <Routes>
                        <Route path="/" element={<Navigate to="/panel-user" />} />
                    </Routes>
                </>
            );
        }
    }


    return (
        <>
            <animated.div style={fadeOut}>
                <div className='container-login'>
                    <div className='child-container-login'>
                        <div>
                            <Link to="/">
                                <img width="170" height="70" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669212845/eleditorNoticias/EditorVerde_f5jfmj.png" alt="Editor Platense" />
                            </Link>
                        </div>
                        <div className='container-login-inputs'>
                            <form className='container-form-inputs'>
                                <label className='input-text'>Nombre de usuario  o correo electrónico</label>
                                <input style={{ outline: 'none', border: '0' }}
                                    className='input-correo'
                                    type="text"
                                    autoComplete='off'
                                    value={login.nameuser}
                                    name="nameuser"
                                    onKeyPress={(e) => pressEnter(e)} onChange={handleLogin}
                                />

                                <label className='input-text'>Contraseña</label>
                                <InputGroup style={{ outline: 'none', border: '1px solid #606060' }}>
                                    <input
                                        className='input-contra'
                                        type={visible ? 'text' : 'password'}
                                        autoComplete='off'
                                        value={login.clave}
                                        name="clave"
                                        onKeyPress={(e) => pressEnter(e)}
                                        onChange={handleLogin}
                                    />
                                    <InputGroup.Button onClick={handleChange} className='input-eye' >
                                        {visible ? <EyeIcon className='input-eye' /> : <EyeSlashIcon className='input-eye' />}
                                    </InputGroup.Button>
                                </InputGroup>
                                {errorLogin === true ? <p className='errorAcceso'>Revise su usuario y/o contraseña</p> : ""}

                                <div className='container-login-send'>
                                    <Button className='button-login' loading={loadingButton} onClick={handleSubmitLogin}>Ingresar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </animated.div>
        </>
    )
}
