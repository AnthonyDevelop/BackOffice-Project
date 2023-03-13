import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import './navbarUser.css';

export default function NavbarUser() {

  const location = useLocation();

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location = "/";
  };

  const dataUser = useSelector((state) => state.reducerDataUser.data);

  return (
    <>
      {
        location.pathname == "/panel-user" ||
          location.pathname == "/panel-user/inicio" ||
          location.pathname == "/panel-user/nueva-entrada" ||
          location.pathname == "/panel-user/editar-entrada" ||
          location.pathname == "/panel-user/lista-entradas" ||
          location.pathname == "/panel-user/medios" ||
          location.pathname == "/panel-user/perfil" ||
          location.pathname == "/panel-user/publicidad" ||
          location.pathname == "/panel-user/categorias" ||
          location.pathname == "/panel-user/usuarios" ||
          location.pathname == "/panel-user/crear-usuario" ||

          location.pathname == "/panel-admin" ||
          location.pathname == "/panel-admin/inicio" ||
          location.pathname == "/panel-admin/nueva-entrada" ||
          location.pathname == "/panel-admin/editar-entrada" ||
          location.pathname == "/panel-admin/lista-entradas" ||
          location.pathname == "/panel-admin/medios" ||
          location.pathname == "/panel-admin/perfil" ||
          location.pathname == "/panel-admin/publicidad" ||
          location.pathname == "/panel-admin/categorias" ||
          location.pathname == "/panel-admin/usuarios" ||
          location.pathname == "/panel-admin/crear-usuario"
          ? ''
          : <div className='navbaruser'>
            <div className='child-container-navbaruser'>
              {dataUser != null && dataUser.data.rol == "Admin" ?
                <Link className='button-link-editor' to="/panel-admin"> Ver Panel </Link> :
                <Link className='button-link-editor' to="/panel-user"> Ver Panel </Link>
              }
              <button className='button-link-editor' onClick={cerrarSesion} > Cerrar sesión </button>
            </div>
          </div>
      }
    </>
  )
}
