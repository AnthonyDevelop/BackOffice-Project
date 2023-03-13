import React, { useState, useEffect } from 'react'
import { Link, Navigate, Routes, Route, BrowserRouter } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import { useSelector, useDispatch } from 'react-redux';

import Home from "../pages/web/Home";
import PostCompleto from "../pages/web/postCompleto/PostCompleto";
import Login from "../pages/backoffice/Login/Login";
import ResultadoBusqueda from "../pages/web/Buscador/ResultadoBusqueda";
import Periodista from "../pages/web/Periodista/Periodista";
import AdminPanel from "../pages/backoffice/AdminPanel/AdminPanel";
import UserPanel from "../pages/backoffice/UserPanel/UserPanel";
import OesteHome from "../pages/OestePlatense/OesteHome";
import PostCompletoOeste from "../pages/OestePlatense/PostCompletoOeste";
import LandingCategorias from "../pages/web/Categorias/LandingCategorias";
import NavbarUser from "../navbar/NavbarUser";
import { getDataUser } from '../../actions/dataUser';
import { respuestaLogin } from '../../actions/login';
import LandingCategoriasOeste from '../pages/web/Categorias/LandingCategoriasOeste';
import ResultadoBusquedaOeste from '../pages/web/Buscador/ResultadoBusquedaOeste';
import Farmacia from '../pages/web/Farmacia/Farmacia';
import PageNotFound from '../pages/web/PageNotFound/PageNotFound';
import { useMediaQuery } from 'react-responsive'

export default function Rutas() {

  const dispatch = useDispatch();

  const [loadingButton, setLoadingButton] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const userLogin = localStorage.getItem('token');
  const logindataUser = useSelector((state) => state.reducerRespuestaLogin.data);
  useEffect(() => {
    if (userLogin != null) {
      dispatch(getDataUser());
    }
  }, [userLogin])

  const dataToken = localStorage.getItem("dataToken");
  const vistaMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:vistaPrevia" element={<PostCompleto />} />
            <Route path="/:categoria/:id/:anio/:mes/:dia/:titulo" element={<PostCompleto />} />
            <Route path="/suplemento/op/:categoria/:id/:anio/:mes/:dia/:titulo" element={<PostCompletoOeste />} />
            <Route path="/categoria/:categoria" element={<LandingCategorias />} />
            <Route path="/categoriaOeste/:categoria" element={<LandingCategoriasOeste />} />
            <Route path="/periodista/:periodista" element={<Periodista />} />
            <Route path="/busqueda/:resultado" element={<ResultadoBusqueda />} />
            <Route path="/busquedaOeste/:resultado" element={<ResultadoBusquedaOeste />} />
            <Route path="/farmacia-de-turno" element={<Farmacia />} />
            <Route path="/login" element={<Login />} />
            <Route path="/panel-admin/*" element={<AdminPanel />} />
            <Route path="/panel-user/*" element={<UserPanel />} />

            <Route path="no-existe-noticia" element={<PageNotFound />} />

            <Route path="/oestePlatense" element={<OesteHome />} />
          </Routes>
          {userLogin != null && vistaMobile == false && dataToken != "esta todo mal" ?
            <NavbarUser />
            : ''}
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}
