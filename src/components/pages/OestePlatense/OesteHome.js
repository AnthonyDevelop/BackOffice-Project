import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar'
import { createContext } from "react";
import './OesteHome.css'
import { useMediaQuery } from 'react-responsive';
import IconoWsp from '../../icono/IconoWsp';
import { getRecibirPosts } from "../../../actions/ElEditor/listaPublicaciones";
import PortadaOeste from "./PortadaOeste";
import { useLocation } from "react-router-dom";
import SeccionPublicidadInvidual from "../web/Secciones/SeccionPublicidadInvidual";
import PostOeste from "../web/post/PostOeste";
import SeccionTituloOeste from "./SeccionTituloOeste";
import CardsConTituloOeste from "./CardsConTituloOeste";
import PortadaRepetidaOeste from "./PortadaRepetidaOeste";
import YoutubeOeste from "./YoutubeOeste";
import TarjetasHorizontalesOeste from "./TarjetasHorizontalesOeste";
import FooterOeste from "./FooterOeste";
import { getListPublicidades } from "../../../actions/listPublicidades";
import NavbarUser from "../../navbar/NavbarUser";
import SeccionPortadaSubPrincipalOeste from "./SeccionPortadaSubPrincipalOeste";
import { useSpring, animated } from "react-spring";
import Loading from "../../Loading/Loading";
import NavbarOeste from "../../navbar/NavbarOeste";

export const ThemeContext = createContext(null);

export default function OesteHome() {

    const location = useLocation();
    const dispatch = useDispatch();

    const [portadaPrincipalData, setPortadaPrincipalData] = useState();
    const [portadaPrincipalMasLeida, setPortadaPrincipalMasLeida] = useState();

    const listPosts = useSelector((state) => state.reducerListPostOeste.data);
    const listPublicidades = useSelector((state) => state.reducerListPublicidades.data);


    const vistaMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });

    const fadeOut = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 50,
    });

    const userLogin = localStorage.getItem('token');

    useEffect(() => {
        if (listPosts != null && listPosts.data != null && listPosts.data[0] != null) {
            setPortadaPrincipalData(listPosts.data[0][0])
            setPortadaPrincipalMasLeida(listPosts.data[2][0][0])
        }
    }, [listPosts]);

    let arregloCronologicoParteUno = [];
    let arregloCronologicoParteDos = [];

    if (listPosts != null && listPosts.data != null && listPosts.data[1] != null) {
        const postsParteUno = listPosts.data[1];
        for (let i = 0; vistaMobile == true ? i < 6 : i < 6; i++) {
            arregloCronologicoParteUno.push(<PostOeste pos={i} post={postsParteUno[i]} nombreArreglo={"Cronologico"} />)
        }
    }

    if (listPosts != null && listPosts.data != null && listPosts.data[1] != null) {
        const postsParteDos = listPosts.data[1];
        for (let i = 6; vistaMobile == true ? i < 6 : i < 9; i++) {
            arregloCronologicoParteDos.push(<PostOeste pos={i} post={postsParteDos[i]} nombreArreglo={"Cronologico"} />)
        }
    }

    let arregloMasLeidosoParteUno = [];
    let arregloMasLeidosoParteDos = [];

    if (listPosts != null && listPosts.data != null && listPosts.data[2] != null) {
        const postsParteUnoLeidas = listPosts.data[2];
        for (let i = 3; vistaMobile == true ? i < 9 : i < 9; i++) {
            arregloMasLeidosoParteUno.push(<PostOeste pos={i} post={postsParteUnoLeidas[i]} nombreArreglo={"Leidos"} />)
        }
    }
    if (listPosts != null && listPosts.data != null && listPosts.data[2] != null) {
        const postsParteDosLeidas = listPosts.data[2];
        for (let i = 7; vistaMobile == true ? i < 10 : i < 11; i++) {
            arregloMasLeidosoParteDos.push(postsParteDosLeidas[i])
        }
    }

    const [theme, setTheme] = useState();
    const dataToken = localStorage.getItem("dataToken");

    return (
        <>
            <ThemeContext.Provider value={{ theme }}>
                <animated.div style={fadeOut}>
                    <div id={theme}>
                        <NavbarOeste theme={theme} setTheme={setTheme} />
                        {userLogin != null && vistaMobile == false && dataToken != "esta todo mal" ?
                            <NavbarUser /> : ''}
                        {!listPosts ? <Loading />
                            :
                            <div className='body-container'>
                                <div className='seccion-portada-home'>
                                    <PortadaOeste dataPortadaPrincipal={portadaPrincipalData != null && portadaPrincipalData} />
                                    <SeccionPublicidadInvidual tipoDePubli={"simple"} publicidadDesk={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[0]} publicidadMob={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[1]} />
                                </div>
                                <SeccionPortadaSubPrincipalOeste dataPortadaSubPrincipal={listPosts != null && listPosts.data != null && listPosts.data[0]} nombreArreglo={"Cronologico"} />
                                <SeccionTituloOeste titulo='RECIENTES' />
                                <CardsConTituloOeste dataCards={arregloCronologicoParteUno} />
                                <SeccionPublicidadInvidual tipoDePubli={"simple"} publicidadDesk={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[2]} publicidadMob={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[3]} />
                                <CardsConTituloOeste dataCards={arregloCronologicoParteDos} />
                                <SeccionTituloOeste titulo='MÁS LEÍDAS' />
                                <PortadaRepetidaOeste dataPortadaPrincipal={portadaPrincipalMasLeida != null && portadaPrincipalMasLeida} />
                                <SeccionPortadaSubPrincipalOeste dataPortadaSubPrincipal={listPosts != null && listPosts.data != null && listPosts.data[2]} nombreArreglo={"Cronologico"} />
                                <CardsConTituloOeste dataCards={arregloMasLeidosoParteUno} />
                                <SeccionPublicidadInvidual tipoDePubli={"dual"} publicidadDesk={listPublicidades != null && listPublicidades.data != null && listPublicidades.data} publicidadMob={listPublicidades != null && listPublicidades.data != null && listPublicidades.data} />
                                {/* <YoutubeOeste/> */}
                                <TarjetasHorizontalesOeste dataTarjetaHorizontales={arregloMasLeidosoParteDos} />
                            </div>}
                        <FooterOeste />
                        <IconoWsp />
                    </div>
                </animated.div>
            </ThemeContext.Provider>
        </>
    );
}