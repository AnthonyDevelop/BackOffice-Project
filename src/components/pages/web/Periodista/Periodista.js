import React, { useState, useEffect } from 'react'
import { Avatar, Pagination } from 'rsuite'
import NavbarEditor from '../../../navbar/Navbar'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getListPostGeneral } from "../../../../actions/listPostGeneral";
import { useSelector, useDispatch } from "react-redux";
import { createContext } from "react";
import { useSpring, animated } from "react-spring";
import Loading from '../../../Loading/Loading';
import './periodistas.css'

export const ThemeContext = createContext(null);

function Periodista() {
    const [data, setData] = useState();
    const [pathname, setPathname] = useState();
    let location = useLocation();
    const [activePage, setActivePage] = useState(1);
    const dispatch = useDispatch();

    const [nombreCategoria, setNombreCategoria]=useState("");

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("dataPeriodista")));
    }, [location]);

    useEffect(() => {
        if (localStorage.getItem("dataPeriodista") == null) {
            setPathname((location.pathname.replace(/%20/g, '-').substring(12)));
        }
    }, [data]);

    useEffect(() => {
        const dataListaEntradas = {
            medio: 1,
            busqueda: '',
            page: activePage,
            estado: '',
            categoria: '',
            autor: data != null ? data.nombre.replace(/ /g, '-') : pathname != null ? pathname : "",
            fechaInicio: '',
            fechaFin: '',
            titulo: '',
            limit: 6
        };
        dispatch(getListPostGeneral(dataListaEntradas));
    }, [data, activePage]);


    const fadeOut = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 250,
    });

    const [theme, setTheme] = useState();

    const listaPostGeneral = useSelector((state) => state.reducerListPost.data);




    var arregloTarjetas = []
    if (listaPostGeneral && listaPostGeneral.data != null) {
        const postPeriodista = listaPostGeneral.data
        for (let i = 0; i < postPeriodista.length; i++) {
            arregloTarjetas.push(
                <Link to={"/" + postPeriodista[i].path} onClick={() => { localStorage.setItem("dataPostNota", JSON.stringify(postPeriodista[i])) }} >
                    <div className='tarjetaHorizontal' key={postPeriodista[i].id} data-aos='fade-in-up' data-aos-duration="1000" data-aos-delay="150" >
                        <div className='foto-tarjeta-horizontal'>
                            <img alt='foto' src={postPeriodista[i] != null ? postPeriodista[i].pathPortada : ''} />
                        </div>
                        <div className='box-texto-tarjetas-horizontal'>
                            <div className='container-categoria-tarjeta-horizontal'>
                            {postPeriodista[i].categorias != null && postPeriodista[i].categorias[0] != null ?
                                postPeriodista[i].categorias[0].nombre === "DESTACADO_PPAL" || postPeriodista[i].categorias[0].nombre === "DESTACADO_VIEW" ?
                                    postPeriodista[i].categorias[1] != null && postPeriodista[i].categorias[1].nombre === "DESTACADO_VIEW" ?
                                        postPeriodista[i].categorias[2] != null ? postPeriodista[i].categorias[2].nombre : null :
                                        postPeriodista[i].categorias[1]?.nombre || null :
                                    postPeriodista[i].categorias[0].nombre || null :
                                null
                            }
                            </div>
                            <p className='titulo-tarjeta-horizontal'>{postPeriodista[i].titulo}</p>
                            <p className='subtitulo-tarjeta-horizontal'>{postPeriodista[i].subtitulo}</p>
                            <p className='autor-tarjeta-horizontal'>Por {postPeriodista[i].redactor.nombre}</p>
                        </div>
                    </div>
                </Link>
            );
        }
    }
    else {
        <Loading />
    }

    return (
        <>
            <ThemeContext.Provider value={{ theme }}>
                <animated.div style={fadeOut}>
                    <div id={theme}>
                        <NavbarEditor theme={theme} setTheme={setTheme} />
                        <div className='container-principal-periodistas'>
                            <div className='info-periodistas'>
                                <div>
                                    <Avatar
                                        className='avatar-periodista'
                                        circle
                                        src={data != null && data.path != "Sin Foto" ?
                                            data.path : listaPostGeneral && listaPostGeneral.data != null && listaPostGeneral.data[0].redactor.path != "Sin Foto" ?
                                                listaPostGeneral.data[0].redactor.path
                                                : "https://res.cloudinary.com/grupo-delsud/image/upload/v1670252546/eleditorNoticias/Group_17778_ujcekc_1_otlhmv.svg"}
                                        alt="@SevenOutman"
                                    />
                                    <h2 className='nombre-periodista'>{data != null ? data.nombre : listaPostGeneral && listaPostGeneral.data != null ? listaPostGeneral.data[0].redactor.nombre : ""}</h2>
                                </div>
                                <hr style={{ border: '2px solid #C6C7C4;', width: '50%' }} />
                                <div className='box-descripcion-periodista'>
                                    <p className='descripcion-periodista'>
                                        {data != null ? data.descripcion : listaPostGeneral && listaPostGeneral.data != null ? listaPostGeneral.data[0].redactor.descripcion : ""}
                                    </p>
                                </div>
                            </div>
                            <div className='periodista-box-publicaciones'>
                                <div className='contenedor-publicaciones-periodista'>
                                    {data != null && listaPostGeneral && listaPostGeneral.data != null && listaPostGeneral.data[0] != null && data.nombre == listaPostGeneral.data[0].redactor.nombre ?
                                        arregloTarjetas
                                        : <Loading />
                                    }
                                </div>
                                <div className='contenedor-paginacion-publicaciones-periodista'>
                                    <Pagination
                                        prev
                                        next
                                        size="sm"
                                        maxButtons={1}
                                        ellipsis={true}
                                        boundaryLinks={true}
                                        total={listaPostGeneral != null ? listaPostGeneral.totalRegisters : ""}
                                        limit={10}
                                        activePage={activePage}
                                        onChangePage={setActivePage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </ThemeContext.Provider>
        </>
    )
}

export default Periodista