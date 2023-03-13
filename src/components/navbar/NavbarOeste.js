// import './navbar.css';
// import '../../App.css'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
// import { getRecibirCategorias } from '../../actions/listaCategorias';
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, CloseButton, NavLink } from 'react-bootstrap';
import { BsSearch, BsFillMoonStarsFill } from 'react-icons/bs';
import { RiMoonCloudyFill } from 'react-icons/ri'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';
// import Buscador from '../pages/web/Buscador/Buscador';
// import { getWeatherData } from './weatherApi';
import { icons } from 'react-icons';
// import IconsWeather from './IconsWeather';
// import { getDolar } from './Dolar';
import { TfiMenu } from 'react-icons/tfi'
// import { getRecibirPosts } from '../../actions/ElEditor/listaPublicaciones';
// import { getRecibirPostsOeste } from '../../actions/listPostOeste';
// import { getListPublicidades } from '../../actions/listPublicidades';
// import { setModoOscuro } from '../../actions/modoOscuro';
import { isUndefined } from 'lodash';
import { getRecibirPosts } from "../../actions/ElEditor/listaPublicaciones";
import { getRecibirPostsOeste } from "../../actions/listPostOeste";
import { getListPublicidades } from "../../actions/listPublicidades";
import { setModoOscuro } from "../../actions/modoOscuro";
import { getRecibirCategorias } from "../../actions/listaCategorias";
import BuscadorOeste from "../pages/web/Buscador/BuscadorOeste";
import { getWeatherData } from "./weatherApi";
import IconsWeather from "./IconsWeather";
import { getDolar } from "./Dolar";

export default function NavbarOeste(props) {
    const [activarBuscador, setActivarBuscador] = useState(false);

    const modoActivado = useSelector((state) => state.reducerModoOscuro.data);
    const theme = props.theme;
    const setTheme = props.setTheme;



    const dispatch = useDispatch();
    const [datoTemperatura, setDatoTemperatura] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const vistaMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });
    const [icon, setIcon] = useState('')
    const [datoDolar, setDatoDolar] = useState();



    function abrirModalbuscador() {
        setShow(true)
    }

    useEffect(() => {
        const data = {
            page: 1,
            nombre: ""
        }
        dispatch(getRecibirCategorias(data));
    }, []);

    useEffect(() => {
        const data = {
            medio: 2
        }
        dispatch(getRecibirPostsOeste(data));
        dispatch(getListPublicidades());
    }, []);

    useEffect(() => {
        const dataEditor = {
            medio: 2
        }
        dispatch(getRecibirPosts(dataEditor));
    }, []);



    const listaCategorias = useSelector((state) => state.reducerCategorias.data);

    function cambiarModo() {
        if (modoActivado != null) {
            dispatch(setModoOscuro(!modoActivado));
            localStorage.setItem("dataModoOscuro", !modoActivado)
        }
    }



    useEffect(() => {
        if (modoActivado == true) {
            setTheme("dark");
        }
        if (modoActivado == false) {
            setTheme("light");
        }
    }, [modoActivado]);

    if (listaCategorias != null && listaCategorias.data != "") {
        const listDeCategorias = listaCategorias.data;
        var arregloCategorias = [];
        var estadoFondo = false;
        for (var z = 4; z < listDeCategorias.length; z++) {
            { estadoFondo = !estadoFondo }
            arregloCategorias.push(
                {
                    id: listDeCategorias[z].id,
                    nombre: listDeCategorias[z].nombre
                }
            );
        }
    }




    if (arregloCategorias != null) {
        var arregloCategoriasSection1 = [];
        var cambiarColor = false
        for (var i = 0; i < arregloCategorias.length; i += 2) {
            const dataCategorias = {
                id: arregloCategorias[i].id,
                nombre: arregloCategorias[i].nombre
            }

            const dataCategorias2 = arregloCategorias[i + 1]
                ? {
                    id: arregloCategorias[i + 1].id,
                    nombre: arregloCategorias[i + 1].nombre,
                }
                : null;

            arregloCategoriasSection1.push(
                <div className={cambiarColor == false ? "background-color-white" : cambiarColor == true && modoActivado === true ? " background-color-grey background-color-oscuro" : "background-color-grey"}>
                    {arregloCategorias[i] != null &&
                        <di className='item-box-menu'>
                            <Nav.Link
                                className="oeste-link-categorias"
                                as={Link}
                                to={"/categoriaOeste/" + arregloCategorias[i].nombre}
                                onClick={() => { localStorage.setItem("dataCategoriaOeste", JSON.stringify(dataCategorias)); setShowMenu(false) }}
                            >
                                {arregloCategorias[i].nombre}
                            </Nav.Link>
                        </di>}

                    {arregloCategorias[i + 1] != undefined ?
                        <div className='item-box-menu'>
                            <Nav.Link
                                className="oeste-link-categorias"
                                as={Link}
                                to={"/categoriaOeste/" + arregloCategorias[i + 1].nombre}
                                onClick={() => { localStorage.setItem("dataCategoriaOeste", JSON.stringify(dataCategorias2)); setShowMenu(false) }}
                            >
                                {arregloCategorias[i + 1].nombre}
                            </Nav.Link>
                        </div>
                        :
                        <div className='item-box-menu'></div>
                    }

                </div>)

            cambiarColor = !cambiarColor;
        }
    }

    const [dataOscuro, setDataOscuro] = useState();
    useEffect(() => {
        setDataOscuro(JSON.parse(localStorage.getItem("dataModoOscuro")));
    }, [modoActivado]);

    const getWeather = async () => {
        try {
            const data = await getWeatherData()
            setDatoTemperatura(data.current_weather.temperature);
            setIcon(data.current_weather.weathercode)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getWeather();
    }, []);

    const getTraerDatosDolar = async () => {
        try {
            const data2 = await getDolar()
            setDatoDolar(data2);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTraerDatosDolar();
    }, []);



    return (
        <>
            {[false].map((expand) => (
                <>
                    <Navbar key={expand} expand={expand} className=" contenedor-principal-navbar" fixed='top' id={theme} >

                        <Container fluid className='sub-contenedor-navbar'>
                            {vistaMobile == true ?
                                <>
                                    <div className='contenedor-navbar-mobile'>
                                        <div>
                                            <Link to="/" onClick={() => setShowMenu(false)}>
                                                <img alt='logoNavbarEditor' className='logo-navbar' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668300669/eleditorNoticias/Group_1_vwyayi.png' />
                                            </Link>
                                        </div>
                                        <div className='box-search-toggle'>
                                            {/* <div>
                                                <div className='box-tempe-mobile'> */}
                                                    {/* <RiMoonCloudyFill color='white' /> */}
                                                    {/* <img className='icon' src={IconsWeather(icon)} alt="icon-weather" />
                                                    <p className='temperatura'>{datoTemperatura}</p>
                                                </div>
                                            </div> */}
                                            <BsSearch color='white' fontSize={20} onClick={handleShow} />
                                            <div className='box-toggle-principal'>
                                                <div class="toggle-btn" id="_1st-toggle-btn">
                                                    <input type="checkbox" onChange={cambiarModo} />
                                                    <span></span>
                                                </div>
                                            </div>

                                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => setShowMenu(true)} />
                                        </div>

                                    </div>
                                </>
                                :
                                <>
                                    <Link className='logo-editor-mobile' to="/"><img alt='logoNavbarEditor' className='logo-navbar' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668294978/eleditorNoticias/Group_1_1_opsoyr.svg' /></Link>
                                    <div className='box-sub-paginas'>
                                        <p className='border-right'>SUPLEMENTOS</p>
                                        <Link to='/oestePlatense'>
                                            {theme === 'dark' ?
                                            <img className='logo-oeste' alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1677674533/eleditorNoticias/Frame_p22lfc_1_htlqds.svg' />
                                            :
                                            <img className='logo-oeste' alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668296887/eleditorNoticias/Frame_p22lfc.svg' />
                                        }
                                        </Link>                                        <NavLink href='https://blick.com.ar/' target="_blank" className='border-left'><img className='logo-blick' alt='logo-blick' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668296887/eleditorNoticias/Logo_versiones-02_1_hqo0j2.svg' /></NavLink>
                                    </div>
                                    <div className='box-search-toggle'>
                                        <div>
                                            <div className='box-tempe-mobile'>
                                                {/* <RiMoonCloudyFill color='white' /> */}
                                                <img className='icon' src={IconsWeather(icon)} alt="icon-weather" />
                                                <p className='temperatura'>{datoTemperatura}</p>
                                            </div>
                                        </div>
                                        <BsSearch className='icono-search' color='#48AC33' fontSize={20} onClick={handleShow} />
                                        {/* <div className='box-toggle-principal'>
                                            <div class="toggle-btn" id="_1st-toggle-btn">
                                                <input type="checkbox" onChange={cambiarModo} />
                                                <span></span>
                                            </div>
                                        </div> */}
                                        <div className='box-toggle-principal'>
                                            <div class="toggle-btn" id="_1st-toggle-btn">
                                                <input type="checkbox" onChange={cambiarModo} checked={dataOscuro == true ? true : false} />
                                                <span></span>
                                                {/* checked={dataOscuro === true ? true : false} */}
                                            </div>
                                        </div>

                                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => setShowMenu(true)}>
                                            {theme === 'dark' ?
                                                <TfiMenu color='white' fontSize={25} />
                                                :
                                                <TfiMenu color='#48AC33' fontSize={25} />
                                            }
                                        </Navbar.Toggle>

                                    </div>
                                </>
                            }

                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement='end'
                                show={showMenu}
                                onHide={handleCloseMenu}
                                className={theme}
                            >
                                <Offcanvas.Header className='header-canvas-principal' closeButton>
                                    <Offcanvas.Title className='menu-logo-offcanvas' id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        <Nav.Link as={Link} to="/" style={{ cursor: 'pointer' }} onClick={() => setShowMenu(false)}>
                                            <img alt='foto-canvas' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668300669/eleditorNoticias/Group_1_vwyayi.png' />
                                        </Nav.Link>                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body className='box-offcanvas-principal' onHide={handleCloseMenu}>
                                    {vistaMobile == true
                                        ?
                                        <>
                                            <div className="logo-oeste-caja-mobile">   
                                            {theme === 'dark' ?                                   
                                                <img className="logo-navbar-oeste" alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1677674533/eleditorNoticias/Frame_p22lfc_1_htlqds.svg' />
                                                :
                                                <img className="logo-navbar-oeste" alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668296887/eleditorNoticias/Frame_p22lfc.svg' />

                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            {theme === 'dark' ? 
                                            <img className="logo-navbar-oeste" alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1677674533/eleditorNoticias/Frame_p22lfc_1_htlqds.svg' />
                                            :
                                            <img className="logo-navbar-oeste" alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668296887/eleditorNoticias/Frame_p22lfc.svg' />

                                            }
                                        </>
                                    }

                                    <div className='contenedor-link-categorias'>
                                        <Nav className="contenedor-canvas-items">
                                            {arregloCategoriasSection1}
                                        </Nav>
                                    </div>

                                    {vistaMobile == true ?
                                        <>
                                            <div className={modoActivado === true ? 'box-mobile-suplementos-dark' : 'box-mobile-suplementos'}>
                                                <div className='titulo-mobile-suplementos'><p>SUPLEMENTOS</p></div>
                                                <div className='box-mobile-oeste-blick'>
                                                    <NavLink to='/oestePlatense' as={Link}><img alt='logo-oeste' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668296887/eleditorNoticias/Frame_p22lfc.svg' /></NavLink>
                                                    <NavLink className='border-left'><img alt='logo-blick' src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668296887/eleditorNoticias/Logo_versiones-02_1_hqo0j2.svg' /></NavLink>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        ''
                                    }
                                    <div className='contenedor-redes-farmacia'>
                                        <div>
                                            <NavLink as={Link} onClick={() => setShowMenu(false)} to={"/farmacia-de-turno"} className='button-farmacias'>FARMACIAS DE TURNO</NavLink>
                                        </div>
                                        <div className='border-gris-navbar'>
                                        </div>
                                        <div className='subbox-redes-navbar'>
                                            <div className='contenedor-redes-navbar'><a href='https://www.facebook.com/eleditorplatense' target="_blank"><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669062649/EditorPlus/akar-icons_facebook-fill_gydtdd.svg' /></a></div>
                                            <div className='contenedor-redes-navbar'><a href='https://www.youtube.com/@ElEditorPlatense' target="_blank"><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669062649/EditorPlus/Vector_bs2ag9.svg' /></a></div>
                                            <div className='contenedor-redes-navbar'><a href='https://www.instagram.com/eleditorplatense/?hl=es' target="_blank" ><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669062649/EditorPlus/22_vwvu2u.svg' /></a></div>
                                            <div className='contenedor-redes-navbar'><a href='https://twitter.com/editor_platense' target="_blank"><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669062649/EditorPlus/Vector65165_hux8yd.svg' /></a></div>
                                        </div>
                                    </div>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                        {/* 
                        <Nav className='box-dolar'>
                            <marquee loop="infinite">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '40%', columnGap: '35px' }}>
                                    <p style={{ color: 'black', fontWeight: '500', fontSize: '15px' }} className='titulo-dolar'>Dólar US </p>
                                    <b style={{ color: '#48AC33' }}>|</b>
                                    {datoDolar != null && datoDolar.map((e) => {
                                        return (
                                            <>
                                                {e.casa.nombre === 'Argentina' || e.casa.nombre === 'Bitcoin' || e.casa.nombre === 'Dolar Soja' || e.casa.nombre === 'Dolar turista' ? '' :
                                                    <>
                                                        <p className='subtitulo-dolar'>{e.casa.nombre} </p>
                                                        <p>Compra </p><p className='compra'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669744706/eleditorNoticias/compra-icons_s8w1av.svg' />  {e.casa.compra}</p>
                                                        <p>Venta </p><p className='venta'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669744705/eleditorNoticias/venta-icons_lb77f7.svg' />  {e.casa.venta}</p>
                                                        <b style={{ color: '#C6C7C4' }}>|</b>

                                                    </>
                                                }
                                            </>
                                        )
                                    })}

                                </div>
                            </marquee>
                        </Nav> */}

                        <div className="cotizaciones-bolsa-container">
                            <div className='cotizaciones-bolsa-box'>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '40%', columnGap: '35px' }}>
                                    {datoDolar != null && datoDolar.map((e) => {
                                        return (
                                            <>
                                                {e.casa.nombre === 'Argentina' || e.casa.nombre === 'Bitcoin' || e.casa.nombre === 'Dolar Soja' || e.casa.nombre === 'Dolar turista' ? '' :
                                                    <>
                                                        <p className='subtitulo-dolar'><b>{e.casa.nombre} </b></p>
                                                        <p>Compra </p><p className='compra'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669744706/eleditorNoticias/compra-icons_s8w1av.svg' />  {e.casa.compra}</p>
                                                        <p>Venta </p><p className='venta'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669744705/eleditorNoticias/venta-icons_lb77f7.svg' />  {e.casa.venta}</p>
                                                        <b style={{ color: '#C6C7C4' }}>|</b>
                                                    </>
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='cotizaciones-bolsa-box copia'>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '40%', columnGap: '35px' }}>
                                    {datoDolar != null && datoDolar.map((e) => {
                                        return (
                                            <>
                                                {e.casa.nombre === 'Argentina' || e.casa.nombre === 'Bitcoin' || e.casa.nombre === 'Dolar Soja' || e.casa.nombre === 'Dolar turista' ? '' :
                                                    <>
                                                        <p className='subtitulo-dolar'><b>{e.casa.nombre} </b></p>
                                                        <p>Compra </p><p className='compra'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669744706/eleditorNoticias/compra-icons_s8w1av.svg' />  {e.casa.compra}</p>
                                                        <p>Venta </p><p className='venta'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669744705/eleditorNoticias/venta-icons_lb77f7.svg' />  {e.casa.venta}</p>
                                                        <b style={{ color: '#C6C7C4' }}>|</b>
                                                    </>
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </Navbar>
                </>
            ))}
            <BuscadorOeste
                show={show} setShow={setShow} onHide={handleClose} theme={theme} handleClose={handleClose}
            />

        </>
    );

}