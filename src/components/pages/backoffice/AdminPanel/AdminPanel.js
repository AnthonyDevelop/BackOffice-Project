import React, { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux';

//ACTIONS
import { verificarLogin } from '../../../../actions/login';
import { getRecibirCategorias } from '../../../../actions/listaCategorias';
import { getDataUser } from '../../../../actions/dataUser';
import { getListPostUser } from '../../../../actions/listPostUser';
import { getListPostGeneral } from '../../../../actions/listPostGeneral';
import { getListMultimedia } from '../../../../actions/listMultimedia';
import { getListUser } from '../../../../actions/listUser';
import { getRoleUser } from '../../../../actions/roleUser';

//PAGES
import Inicio from '../UserPanel/Pages/Inicio/Inicio';
import NuevaEntrada from '../UserPanel/Pages/Entradas/NuevaEntrada/NuevaEntrada';
import ListaEntradas from '../UserPanel/Pages/Entradas/ListaEntradas/ListaEntradas';
import Medios from '../UserPanel/Pages/Medios/Medios';
import Categorias from '../UserPanel/Pages/Categorias/Categorias';
import Perfil from '../UserPanel/Pages/Perfil/Perfil';
import Estadisticas from '../UserPanel/Pages/Estadisticas/Estadisticas';
import ListaUser from '../UserPanel/Pages/Usuarios/ListaUser/ListaUser';
import CrearUsuario from '../UserPanel/Pages/Usuarios/CrearUsuario/CrearUsuario';
import EditarEntrada from '../UserPanel/Pages/Entradas/EditarEntrada/EditarEntrada';
import Publicidad from '../UserPanel/Pages/Publicidad/Publicidad';

//ICONS
import { FaUsers } from 'react-icons/fa';
import { IoMdMegaphone } from 'react-icons/io';

import { getListPublicidades } from '../../../../actions/listPublicidades';
import { useSpring, animated } from "react-spring";
import { useMediaQuery } from 'react-responsive'
export default function AdminPanel() {

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  const dispatch = useDispatch();

  const [active, setActive] = useState("1");
  const dataUser = useSelector((state) => state.reducerDataUser.data);


  function cerrarSesion() {
    dispatch(verificarLogin(false));
    localStorage.removeItem("token");
    localStorage.clear();
    window.location = "/";
  };
  const vistaMobile = useMediaQuery({
    query: '(min-width: 768px)'

})

  const [expand, setExpand] = useState(true);
  const NavToggle = ({ active, onSelect, onChange, ...props }) => {
    return (
      <Nav {...props} vertical activeKey={active} onSelect={onSelect} className="nav-toggle">
        <div className='nav-body-sidebar'>
          <Nav.Item eventKey="1" as={Link} to="inicio">Inicio</Nav.Item>
          <Nav.Menu className='item-with-icon' eventKey="2"
            placement="rightStart" title="Entradas" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149540/eleditorNoticias/Frame_10_ynl0cb.svg" />}>
             <li role="none presentation"><a class="rs-dropdown-item" target="_blank" href="https://editor.fourcapital.com.ar/panel-admin/nueva-entrada" > Añadir nueva <span class="rs-ripple-pond"><span class="rs-ripple"></span></span></a></li>
            <Nav.Item eventKey="2-2" as={Link} to="lista-entradas"> Todas </Nav.Item>
          </Nav.Menu>
          <Nav.Item className='item-with-icon' eventKey="3" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149541/eleditorNoticias/Frame_11_nwjhh7.svg" />} as={Link} to="medios" >Medio</Nav.Item>
          <Nav.Item className='item-with-icon' eventKey="4" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149540/eleditorNoticias/Frame_12_rhr3np.svg" />} as={Link} to="categorias">Categorias</Nav.Item>
          {/* <Nav.Item className='item-with-icon' eventKey="5" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672150670/eleditorNoticias/Frame_17_qmf1v9.svg" />} >Etiquetas</Nav.Item> */}
          <Nav.Item className='item-with-icon' eventKey="99" icon={<IoMdMegaphone />} as={Link} to="publicidad">Publicidad</Nav.Item>
          <Nav.Item className='item-with-icon' eventKey="6" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149540/eleditorNoticias/Frame_13_xzodnl.svg" />} as={Link} to="perfil">Perfil</Nav.Item>

          <Nav.Menu className='item-with-icon' eventKey="11"
            placement="rightStart" title="Usuarios" icon={<FaUsers />}>
            <Nav.Item eventKey="11-1" as={Link} to="crear-usuario"> Nuevo usuario </Nav.Item>
            <Nav.Item eventKey="32-2" as={Link} to="usuarios"> Lista usuarios </Nav.Item>
          </Nav.Menu>
          {/* <Nav.Item className='item-with-icon' eventKey="7" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149540/eleditorNoticias/Frame_14_l8pxya.svg" />} as={Link} to="estadisticas">Estadísticas</Nav.Item> */}
        </div>
        <div className='nav-footer-sidebar'>
          <Nav.Item className='item-with-icon' eventKey="8" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149540/eleditorNoticias/Frame_15_ythfls.svg" />} as={Link} to="/" > Visitar Web </Nav.Item>
          <Nav.Item className='item-with-icon' eventKey="9" icon={<img alt="icono-entradas" width='30px' height='30px' src="https://res.cloudinary.com/grupo-delsud/image/upload/v1672149540/eleditorNoticias/Frame_16_jaqvjw.svg" />} onClick={cerrarSesion}> Cerrar Sesion </Nav.Item>

        </div>
      </Nav>
    );
  };

  useEffect(() => {
    const dataCategoria = {
      page: 1,
      nombre: ''
    }
    dispatch(getRecibirCategorias(dataCategoria));
    dispatch(getRoleUser());
    dispatch(getDataUser());

    const dataMultimedia = {
      nombre: "",
      page: 1,
      type:"",
    }
    dispatch(getListMultimedia(dataMultimedia));

    const dataUsuarios = {
      page: 1,
      busqueda: ''
    }
    dispatch(getListUser(dataUsuarios));
    dispatch(getListPublicidades());

  }, [])



  useEffect(() => {
    if (dataUser != null) {
      dispatch(getListPostUser(dataUser.data.id));
    }
  }, [dataUser])

  //LISTA DE ENTRADAS
  useEffect(() => {
    // localStorage.removeItem("dataPost");
    const dataListaEntradas = {
      medio: 1,
      busqueda: '',
      page: 1,
      estado: '',
      categoria: '',
      autor: '',
      fechaInicio: '',
      fechaFin: '',
      titulo: '',
      limit: 15,
    };
    dispatch(getListPostGeneral(dataListaEntradas));
  }, []);

  return (
    <>
      <animated.div style={fadeOut}>
        <div className="container-panel">
        {vistaMobile ?
          <Container className='child-container-panel'>
            <Sidebar style={{ display: 'flex', flexDirection: 'column', background: '#3D3D3B' }}>
              <Sidenav.Header>
                <div className='container-logo'>
                  <Link to="/">
                    <img width="130" height="50" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669212845/eleditorNoticias/EditorVerde_f5jfmj.png" alt="Editor Platense" />
                  </Link>
                </div>
                <div className='container-nombre'>
                  <p>Hola {dataUser != null ? dataUser.data.nombre : ''}! </p>
                  <hr />
                </div>

              </Sidenav.Header>
              <Sidenav className='sidebar-panel-user' expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                <Sidenav.Body>
                  <NavToggle active={active} onSelect={setActive} />
                </Sidenav.Body>
              </Sidenav>
            </Sidebar >

            <Container>
              <Routes path="/*">
                <Route index element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="nueva-entrada" element={<NuevaEntrada />} />
                <Route path="editar-entrada" element={<EditarEntrada />} />
                <Route path="lista-entradas" element={<ListaEntradas />} />
                <Route path="medios" element={<Medios />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="publicidad" element={<Publicidad />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="usuarios" element={<ListaUser />} />
                <Route path="crear-usuario" element={<CrearUsuario />} />
                {/* <Route path="estadisticas" element={<Estadisticas />} /> */}
              </Routes>
            </Container>
          </Container >
           :
           <>
               <div className='box-principal-no-disponible'>
                   <Link to="/" >
                       <img  alt='logoNavbarEditor' className='logo-navbar-no-disponible' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668300669/eleditorNoticias/Group_1_vwyayi.png' />
                   </Link>
                   <p className='texto-no-disponible'>VISTA NO DISPONIBLE</p>
                   <Link  to="/" className='button-volver-no-disponible'>Volver al inicio</Link>
               </div>
           </>
       }
        </div >
      </animated.div>
    </>
  )
}
