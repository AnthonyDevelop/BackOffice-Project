import React, { useState, useEffect } from 'react'
import SeccionCardsConTitulo from '../Secciones/SeccionCardsConTitulo'
import SeccionTarjetasHorizontales from '../Secciones/SeccionTarjetasHorizontales';
import { Pagination } from 'rsuite';
import { createContext } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListPostGeneral } from '../../../../actions/listPostGeneral';
import Post from '../post/Post';
import NavbarEditor from '../../../navbar/Navbar';
import Footer from '../../../footer/Footer';
import { useSpring, animated } from "react-spring";
import './resultadoBusqueda.css'
import NavbarOeste from '../../../navbar/NavbarOeste';
import PostOeste from '../post/PostOeste';

export const ThemeContext = createContext(null);


export default function LandingCategoriasOeste() {

    let location = useLocation();
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [activePage, setActivePage] = useState(1);
    const [totalRegisters, setTotalRegisters] = useState(0);

    const fadeOut = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 200,
    });

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("dataCategoriaOeste")));
    }, [location]);

    //LISTA DE ENTRADAS
    useEffect(() => {
        if(data!=null){
        const dataListaEntradas = {
            medio: 2,
            busqueda: '',
            page: activePage,
            estado: '',
            categoria: data != null ? data.nombre : '',
            autor: '',
            fechaInicio: '',
            fechaFin: '',
            titulo: '',
            limit: 6,
        };
        dispatch(getListPostGeneral(dataListaEntradas));
        ScrollToTop5()
    }
    }, [data, activePage]);

    const listaPostGeneral = useSelector((state) => state.reducerListPost.data);

    if (data != null) {
        console.log(data)
    }

    const rptaListGeneral = useSelector((state) => state.reducerResputaListPostGeneral.data);

    if (listaPostGeneral != null && listaPostGeneral.data != null) {
        var arregloBusquedaFiltrados = [];
        const listBusqueda = listaPostGeneral.data;
        for (let i = 0; i < listBusqueda.length; i++) {
            arregloBusquedaFiltrados.push(
                <>
                    {/* <Link to={`/${posts[i].id}`} > */}
                    <PostOeste pos={i} post={listBusqueda[i]} nombreArreglo={"Cronologico"} filterCategoria={data!=null && data.nombre}/>
                    {/* </Link> */}
                </>
            );
        }
    }

    const [theme, setTheme] = useState();

    const ScrollToTop5 = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    return (
        <>
            <ThemeContext.Provider value={{ theme }}>
                <animated.div style={fadeOut}>
                    <div id={theme}>
                        <NavbarOeste theme={theme} setTheme={setTheme} />
                        <div className='contenedor-resultado-busqueda'>
                            <div className='contenedor-busqueda-gris'>
                                <div className='box-titulos-buscador'>
                                    <p className='titulo-buscador'>Resultados de búsqueda en OestePlatense</p>
                                    <p className='subtitulo-buscador'>
                                        {listaPostGeneral != null ? listaPostGeneral.totalRegisters + ' ' : ''}
                                        artículos para la categoría “{data != null ? data.nombre : ''}”
                                    </p>
                                </div>
                            </div>

                            {listaPostGeneral != null && listaPostGeneral.data != null && listaPostGeneral.data.length > 0 ?
                                <div className='contenedor-paginacion-resultado'>
                                    <div className='subbox-buscador-info'>
                                        <SeccionCardsConTitulo dataCards={arregloBusquedaFiltrados} />
                                        <Pagination
                                            className='paginacion-buscador-filtro'
                                            prev
                                            next
                                            size="sm"
                                            total={listaPostGeneral != null ? listaPostGeneral.totalRegisters : ""}
                                            limit={6}
                                            ellipsis={true}
                                            maxButtons={1}
                                            boundaryLinks={true}
                                            activePage={activePage}
                                            onChangePage={setActivePage}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="post-completo-container">
                                    <div className='container-sin-post'>
                                        <h1>No se encontraron noticias.</h1>
                                    </div>
                                </div>
                            }
                        </div>
                        <Footer />
                    </div>
                </animated.div>
            </ThemeContext.Provider>
        </>
    )
}
