import '../../navbar/navbar.css'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getRecibirPosts } from '../../../actions/ElEditor/listaPublicaciones';
import Navbar from '../../navbar/Navbar'
import Post from './post/Post';
import { createContext } from "react";
import './home.css';
import SeccionPortada from './Secciones/SeccionPortada';
import SeccionPublicidadInvidual from './Secciones/SeccionPublicidadInvidual';
import SeccionCardsConTitulo from './Secciones/SeccionCardsConTitulo';
import SeccionCardsSinTitulo from './Secciones/SeccionCardsSinTitulo';
import SeccionYoutube from './Secciones/SeccionYoutube';
import SeccionTitulo from './Secciones/SeccionTitulo';
import SeccionTarjetasHorizontales from './Secciones/SeccionTarjetasHorizontales';
import { useMediaQuery } from 'react-responsive';
import Footer from '../../footer/Footer';
import IconoWsp from '../../icono/IconoWsp';
import SeccionPortadaRepetida from './Secciones/SeccionPortadaRepetida';
import NavbarUser from '../../navbar/NavbarUser';
import { getListPublicidades } from '../../../actions/listPublicidades';
import SeccionPortadaSubPrincipal from './Secciones/SeccionPortadaSubPrincipal';
import { useSpring, animated } from "react-spring";
import Loading from '../../Loading/Loading';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export const ThemeContext = createContext(null);

export default function Home() {
    const dispatch = useDispatch();

    const dataUser = useSelector((state) => state.reducerDataUser.data);
    const userLogin = localStorage.getItem('token');

    const [portadaPrincipalData, setPortadaPrincipalData] = useState();
    const [portadaPrincipalMasLeida, setPortadaPrincipalMasLeida] = useState();

    const vistaMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });

    const listPosts = useSelector((state) => state.reducerPosts.data);
    const listPublicidades = useSelector((state) => state.reducerListPublicidades.data);

    const fadeOut = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 50,
    });

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
            arregloCronologicoParteUno.push(<Post pos={i} post={postsParteUno[i]} nombreArreglo={"Cronologico"} />)
        }
    }

    if (listPosts != null && listPosts.data != null && listPosts.data[1] != null) {
        const postsParteDos = listPosts.data[1];
        for (let i = 6; vistaMobile == true ? i < 6 : i < 9; i++) {
            arregloCronologicoParteDos.push(<Post pos={i} post={postsParteDos[i]} nombreArreglo={"Cronologico"} />)
        }
    }

    let arregloMasLeidosoParteUno = [];
    let arregloMasLeidosoParteDos = [];

    if (listPosts != null && listPosts.data != null && listPosts.data[2] != null) {
        const postsParteUnoLeidas = listPosts.data[2];
        for (let i = 1; vistaMobile == true ? i < 7 : i < 7; i++) {
            arregloMasLeidosoParteUno.push(<Post pos={i} post={postsParteUnoLeidas[i]} nombreArreglo={"Leidos"} />)
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
            <ThemeContext.Provider value={{theme}}>
                <animated.div style={fadeOut}>
                    <div id={theme}>
                        <Navbar theme={theme} setTheme={setTheme} />
                        {userLogin != null && vistaMobile == false && dataToken != "esta todo mal" ? <NavbarUser /> : ''}
                        {!listPosts ?
                        <Loading/>
                        :
                        <div className='body-container'>  
                            <div className='seccion-portada-home'>
                                <SeccionPortada dataPortadaPrincipal={portadaPrincipalData != null && portadaPrincipalData} />
                                <SeccionPublicidadInvidual tipoDePubli={"simple"} publicidadDesk={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[0]} publicidadMob={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[1]} />
                            </div>
                            <SeccionPortadaSubPrincipal dataPortadaSubPrincipal={listPosts != null && listPosts.data != null && listPosts.data[0]} nombreArreglo={"Cronologico"} />
                            <SeccionTitulo titulo='RECIENTES' />
                            <SeccionCardsConTitulo dataCards={arregloCronologicoParteUno} />
                            <SeccionPublicidadInvidual tipoDePubli={"simple"} publicidadDesk={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[2]} publicidadMob={listPublicidades != null && listPublicidades.data != null && listPublicidades.data[3]} />
                            <SeccionCardsConTitulo dataCards={arregloCronologicoParteDos} />
                            <SeccionTitulo titulo='MÁS LEÍDAS' />
                            <SeccionPortadaRepetida dataPortadaPrincipal={portadaPrincipalMasLeida != null && portadaPrincipalMasLeida} />
                            <SeccionPortadaSubPrincipal dataPortadaSubPrincipal={listPosts != null && listPosts.data != null && listPosts.data[2][0]} nombreArreglo={"Leidos"} />
                            <SeccionCardsConTitulo dataCards={arregloMasLeidosoParteUno} />
                            <SeccionPublicidadInvidual tipoDePubli={"dual"} publicidadDesk={listPublicidades != null && listPublicidades.data != null && listPublicidades.data} publicidadMob={listPublicidades != null && listPublicidades.data != null && listPublicidades.data} />
                            <SeccionYoutube />
                            <SeccionTarjetasHorizontales dataTarjetaHorizontales={arregloMasLeidosoParteDos} />
                        </div>}
                        <Footer />
                        <IconoWsp />
                    </div>
                </animated.div>
            </ThemeContext.Provider>
        </>
    );
}