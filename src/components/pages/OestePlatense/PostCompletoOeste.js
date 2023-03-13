import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SeccionTituloOeste from "./SeccionTituloOeste";
// Import Swiper React components
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Avatar } from "rsuite";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CardsConTituloOeste from "./CardsConTituloOeste";
import SeccionCardsConTitulo from "../web/Secciones/SeccionCardsConTitulo";
import { Link } from "react-router-dom";
import NavbarEditor from "../../navbar/Navbar";
import FooterOeste from "./FooterOeste";
import { useMediaQuery } from "react-responsive";
import TarjetasverticalesOeste from "./TarjetasVerticalesOeste";
import SeccionTarjetasverticales from "../web/Secciones/SeccionTarjetasverticales";
import { getRecibirPostsFiltrados } from "../../../actions/ElEditor/listaPublicacionesFiltradas";
import { getDataPostPath } from "../../../actions/dataPostPath";
import PostOeste from "../web/post/PostOeste";
import { useSelector, useDispatch } from "react-redux";
import { createContext } from "react";
import { getRecibirPosts } from "../../../actions/ElEditor/listaPublicaciones";
import { setSumarVisita } from "../../../actions/sumarVisita";
import { useSpring, animated } from "react-spring";
import Plyr from 'plyr';
import Loading from "../../Loading/Loading";
import { Pagination } from "swiper";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import NavbarOeste from "../../navbar/NavbarOeste";

export const ThemeContext = createContext(null);

function PostCompletoOeste(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState("");
  let location = useLocation();
  const [data, setData] = useState();

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 50,
  });

  const parse = require("html-react-parser");
  const listacategorias = useSelector((state) => state.reducerCategorias.data);
  const dataPostByPath = useSelector((state) => state.reducerDataPostPath.data);
  const listPublicidades = useSelector((state) => state.reducerListPublicidades.data);

  const dataUser = useSelector((state) => state.reducerDataUser.data);
  const userLogin = localStorage.getItem("token");


  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("dataPostNota")));
  }, [location]);

  useEffect(() => {
    if (data === null) {
      const segments = location.pathname.split("/");
      const texto = segments.slice(8).join("/");
      dispatch(getDataPostPath(texto));

    }
  }, [data]);

  useEffect(() => {
    if (dataPostByPath != null) {
      setData(dataPostByPath.message);
    }
  }, [dataPostByPath]);


  useEffect(() => {
    setThumbsSwiper("");
  }, [data]);

  const dispatch = useDispatch();

  const vistaMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const dataPost = {
      medio: 2,
      busqueda: "",
      page: 1,
      estado: "",
      categoria: "",
      autor: "",
      fechaInicio: "",
      fechaFin: "",
      titulo: "",
      limit: 12
    };
    dispatch(getRecibirPostsFiltrados(dataPost));
  }, []);

  useEffect(() => {
    if (data != null) {
      dispatch(setSumarVisita(data.id))
    }
  }, [data]);

  useEffect(() => {
    const data = {
      medio: 2,
    }
    dispatch(getRecibirPosts(data));
  }, []);

  const listPublicacionCompleto = useSelector(
    (state) => state.reducerPostsFiltradas.data
  );

  const listParaPublicacion = useSelector((state) => state.reducerPosts.data);

  if (listPublicacionCompleto != null && listPublicacionCompleto.data != null) {
    var arregloBusquedaCompleta = [];
    const listCompletoPublicacion = listPublicacionCompleto.data;

    let arregloAux = []; let pos = 0;
    while (arregloAux.length != 6 && pos < listCompletoPublicacion.length) {
      if (data != null && data.id != listCompletoPublicacion[pos].id) {
        arregloAux.push(listCompletoPublicacion[pos]);
      }
      pos++
    }
    if (arregloAux.length > 0) {
      for (let i = 0; i < 6; i++) {
        arregloBusquedaCompleta.push(
          <>
            {/* <Link to={`/${posts[i].id}`} > */}
            <PostOeste pos={i} post={arregloAux[i]} nombreArreglo={"Cronologico"} />
            {/* </Link> */}
          </>
        );
      }
    }

  }

  const listPostsPerodista = useSelector((state) => state.reducerPosts.data);
  if (listPostsPerodista != null && listPostsPerodista.data != null) {
    // var postsPortada = listPosts.data[0]['publicacionesPortada'][0];
  }

  const fechaPosteo = data && data.dateUpdate != null && data.dateUpdate.date;
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diaPosteo = new Date(fechaPosteo).getDate();
  const arrayMesPosteo = new Date(fechaPosteo);
  var mesPosteo = meses[arrayMesPosteo.getMonth()];
  const anoPosteo = new Date(fechaPosteo).getFullYear();

  const player = new Plyr('#video-player-oeste', {
    i18n: {
      speed: 'Velocidad'
    },
  });

  const shareUrl = data != null && data.path;

  return (
    <>
      <animated.div style={fadeOut}>
        {/* <ThemeContext.Provider value={{ theme, toggleTheme }}> */}
        <div className="App" id={theme}>
          <NavbarOeste theme={theme} setTheme={setTheme} />
          <div className="post-completo-container">
            <div className='container-principal-home-post-completo'>
              <div className='subcontainer-home-post-completo'>
                <div className='box-foto-post-completo'>
                  <div className="imagen-destacada-seccion-post">
                    {/* CATEGORIA */}
                    {data != null && data.categorias != null && data.categorias[0].nombre != null ? (
                      <div className="container-post-completo-categoria-oeste">
                        {(data.categorias[0].nombre == "DESTACADO_PPAL" && data.categorias[1].nombre == "DESTACADO_VIEW") ? data.categorias[2].nombre : (data.categorias[0].nombre == "DESTACADO_PPAL" || data.categorias[0].nombre == "DESTACADO_VIEW") ? data.categorias[1].nombre : data.categorias[0].nombre}
                      </div>
                    ) : (
                      data != null && data.categorias != null && data.categorias[0].nombre == null ?
                        <div className="container-post-completo-categoria-oeste">
                          {(data.categorias[0] == "DESTACADO_PPAL" && data.categorias[1] == "DESTACADO_VIEW") ? data.categorias[2] : (data.categorias[0] == "DESTACADO_PPAL" || data.categorias[0] == "DESTACADO_VIEW") ? data.categorias[1] : data.categorias[0]}
                        </div>
                        :
                        ""
                    )}
                    {/* IMAGEN PORTADA */}
                    {data != null && data.pathPortada != null && (
                      <img
                        className="foto-principal"
                        alt="foto-principal"
                        src={data.pathPortada}
                      />
                    )}
                    <div className="contenedor-border-verde">
                      <div className="border-rojo-oeste-caja"></div>
                    </div>
                  </div>
                  <div className="box-info-posteo">
                    <h1 className="titulo-principal">
                      {data != null && data.titulo}
                    </h1>
                    <p className="subtitulo-rojo-oeste-principal">
                      {diaPosteo + " de " + mesPosteo + " de " + anoPosteo}
                    </p>
                    <p className="texto-informacion-principal">
                      {data != null && data.subtitulo}
                    </p>

                    {/* SHARE REDES */}
                    <div className="box-redes-post-completo">
                      {/* share without instagram */}
                      {/* <div>
                        <Link>
                          <img alt="" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669043574/eleditorNoticias/instagram_2_ycamt1.svg" />
                        </Link>
                      </div> */}
                      <div>
                        <FacebookShareButton url={"https://editor.fourcapital.com.ar/" + shareUrl}
                          className="Demo__some-network__share-button"
                        >
                          <img alt="" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669043574/eleditorNoticias/facebook_bwfgh4.svg" />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <TwitterShareButton url={"https://editor.fourcapital.com.ar/" + shareUrl}>
                          <img alt="" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669043574/eleditorNoticias/gorjeo_zxtcrb.svg" />
                        </TwitterShareButton>
                      </div>
                      <div>
                        <WhatsappShareButton url={"https://editor.fourcapital.com.ar/" + shareUrl}>
                          <img alt="" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669043574/eleditorNoticias/whatsapp_1_2_ouqac4.svg" />
                        </WhatsappShareButton>
                      </div>
                    </div>

                    {/* BOTON VOLVER */}
                    {/* {dataUser != null &&
                      userLogin != null &&
                      data != null &&
                      data.ruta != null && (
                        <div className="button-volver-entrada">
                          {data.ruta == "editarPost" ? (
                            <Link
                              to={"/panel-user/editar-entrada"}
                              onClick={() => {
                                localStorage.setItem(
                                  "dataPostEdit",
                                  JSON.stringify(data)
                                );
                              }}
                            >
                              Editar entrada
                            </Link>
                          ) : (
                            <Link
                              to={"/panel-user/nueva-entrada"}
                              onClick={() => {
                                localStorage.setItem(
                                  "dataPost",
                                  JSON.stringify(data)
                                );
                              }}
                            >
                              Editar entrada
                            </Link>
                          )}
                        </div>
                      )} */}
                    {data != null && (
                      <div className="codex-editor__redactor">
                        {data.blocks.map((item, key) => {
                          if (item.type == "paragraph") {
                            return (
                              <p className="parrafo-post-completo">
                                {parse(item.data.text)}
                              </p>
                            );
                          }
                          if (item.data[2] == "video") {
                            return (
                              <div className="video-post-container">
                                <video id="video-player-oeste" class="plyr">
                                  <source src={item.data[1]} />
                                </video>
                                <img alt="logoEditor" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1676299847/eleditorNoticias/Group_121_nljbnx.svg" />
                              </div>
                            );
                          }
                          if (item.data[2] == "img") {
                            return (
                              <div className="imagen-entrada-container">
                                <img src={item.data[1]} />
                              </div>
                            );
                          }

                          // if (item.type == "publicidad") {
                          //   if (vistaMobile == true) {
                          //     if (item.dataMobile.type == "image/jpeg" || item.dataMobile.type == "image/jpg" || item.dataMobile.type == "image/png" || item.dataMobile.type == "image/gif" || item.dataMobile.type == "image/webp") {
                          //       return (
                          //         <div className="imagen-entrada-container">
                          //           <img src={item.dataMobile.path} />
                          //         </div>
                          //       );
                          //     }
                          //     if (item.dataMobile.type == "video/mp4") {
                          //       return (
                          //         <div className="video-publicidad-post">
                          //           <video className="video-publicidad-post" muted autoPlay loop playsinline>
                          //             <source src={item.dataMobile.path} />
                          //           </video>
                          //         </div>
                          //       );
                          //     }
                          //   }
                          //   if (vistaMobile == false) {
                          //     if (item.data.type == "image/jpeg" || item.data.type == "image/jpg" || item.data.type == "image/png" || item.data.type == "image/gif" || item.data.type == "image/webp") {
                          //       return (
                          //         <div className="imagen-entrada-container">
                          //           <img src={item.data.path} />
                          //         </div>
                          //       );
                          //     }
                          //     if (item.data.type == "video/mp4") {
                          //       return (
                          //         <div className="video-publicidad-post">
                          //           <video className="video-publicidad-post" muted autoPlay loop playsinline>
                          //             <source src={item.data.path} />
                          //           </video>
                          //         </div>
                          //       );
                          //     }
                          //   }


                          // }
                          if (item.type == "publicidad") {
                            if (vistaMobile == true) {
                              if (item.dataMobile.type == "image/jpeg" || item.dataMobile.type == "image/jpg" || item.dataMobile.type == "image/png" || item.dataMobile.type == "image/gif" || item.dataMobile.type == "image/webp") {
                                return (
                                  <div className="imagen-entrada-container publicidad-mid-desktop">
                                    <a target="_blank" href={item.dataMobile.url}>
                                      <img src={item.dataMobile.path} />
                                    </a>
                                  </div>
                                );
                              }
                              if (item.dataMobile.type == "video/mp4") {
                                return (
                                  <div className="video-publicidad-post">
                                    <a target="_blank" href={item.dataMobile.url}>
                                      <video className="video-publicidad-post" src={item.dataMobile.path}  autoPlay muted loop playsInline>                                            
                                      </video>
                                    </a>
                                    
                                  </div>
                                );
                              }
                            }
                            if (vistaMobile == false) {
                              if (item.data.type == "image/jpeg" || item.data.type == "image/jpg" || item.data.type == "image/png" || item.data.type == "image/gif" || item.data.type == "image/webp") {
                                return (
                                  <div className="imagen-entrada-container">
                                    <a target="_blank" href={item.data.url}>
                                      <img src={item.data.path} />
                                    </a>
                                  </div>
                                );
                              }
                              if (item.data.type == "video/mp4") {
                                return (
                                  <div className="video-publicidad-post">
                                    <a target="_blank" href={item.data.url}>
                                      <video className="video-publicidad-post" src={item.data.path} muted autoPlay loop playsinline>                             
                                      </video>
                                    </a>

                                  </div>
                                );
                              }
                            }
                          }

                          if (item.type == "header") {
                            return <h2>{item.data.text}</h2>;
                          }
                          if (item.type == "list") {
                            return (
                              <ol className="cdx-block cdx-list cdx-list--ordered post-list-container">
                                {item.data.items.map((items, key) => {
                                  return (
                                    <li className="cdx-list__item post-list-item">
                                      {parse(items)}
                                    </li>
                                  );
                                })}
                              </ol>
                            );
                          }
                          if (item.type == "checklist") {
                            return (
                              <div>
                                {item.data.items.map((items, key) => {
                                  return (
                                    <div
                                      className={
                                        items.checked != true
                                          ? "cdx-checklist__item"
                                          : "cdx-checklist__item cdx-checklist__item--checked"
                                      }
                                    >
                                      <span className="cdx-checklist__item-checkbox"></span>
                                      <p className="post-checklist-text">
                                        {items.text}
                                      </p>
                                      <br />
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }
                          if (item.type == "table") {
                            return (
                              <table className="tc-table">
                                {item.data.content.map((items, key) => {
                                  return (
                                    <>
                                      <div className="tc-row">
                                        {items.map((itemInner, keyInner) => {
                                          return (
                                            <div className="tc-cell">
                                              {itemInner}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  );
                                })}
                              </table>
                            );
                          }
                          if (item.type == "code") {
                            return (
                              <>
                                <div className="container-code-post">
                                  {parse(item.data.code)}
                                </div>

                              </>
                            );
                          }

                          if (item.type == "quote") {
                            return (
                              <>
                                <blockquote>{parse(item.data.text)}</blockquote>
                                <p>{parse(item.data.caption)}</p>
                              </>
                            );
                          }
                          if (item.type == "linkTool") {
                            return (
                              <>
                                <a href={item.data.link}>{item.data.link}</a>
                              </>
                            );
                          }
                          if (item.type == "delimiter") {
                            return (
                              <>
                                <hr />
                              </>
                            );
                          }
                          // if (item.type == "carrouselTool") {
                          //   return (
                          //     <div className="carrousel-container">
                          //       <Swiper
                          //         loop={true}
                          //         spaceBetween={10}
                          //         thumbs={{ swiper: thumbsSwiper }}
                          //         modules={[FreeMode, Thumbs]}
                          //         className="slider-superior-grande"
                          //       >
                          //         {item.data[1].map((items, key) => {
                          //           return (
                          //             <SwiperSlide>
                          //               <img src={items} />
                          //             </SwiperSlide>
                          //           );
                          //         })}
                          //       </Swiper>

                          //       <Swiper
                          //         loop={true}
                          //         spaceBetween={20}
                          //         slidesPerView={3}
                          //         freeMode={true}
                          //         watchSlidesProgress={true}
                          //         modules={[FreeMode, Navigation, Thumbs]}
                          //         className="slider-inferior-thumbail"
                          //         onSwiper={setThumbsSwiper}
                          //       >
                          //         {item.data[1].map((items, key) => {
                          //           return (
                          //             <SwiperSlide>
                          //               <img src={items} />
                          //             </SwiperSlide>
                          //           );
                          //         })}
                          //       </Swiper>
                          //     </div>
                          //   );
                          // }
                          if (item.type == "carrouselTool") {
                            return (
                              <div className="carrousel-container">
                                <Swiper
                                  style={{
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                  }}
                                  navigation={true}
                                  pagination={{
                                    clickable: true,
                                  }}
                                  thumbs={{ swiper: thumbsSwiper }}
                                  modules={[FreeMode, Navigation, Thumbs, Pagination]}
                                  loop={true}
                                  spaceBetween={10}
                                  className="slider-superior-grande"
                                >
                                  {item.data[1].map((items, key) => {
                                    return (
                                      <SwiperSlide>
                                        <img src={items} />
                                      </SwiperSlide>
                                    );
                                  })}
                                </Swiper>

                                <Swiper

                                  onSwiper={setThumbsSwiper}
                                  loop={true}
                                  spaceBetween={10}
                                  slidesPerView={4}
                                  freeMode={true}
                                  watchSlidesProgress={true}
                                  modules={[FreeMode, Navigation, Thumbs]}
                                  className="slider-inferior-thumbail"
                                >
                                  {item.data[1].map((items, key) => {
                                    return (
                                      <SwiperSlide>
                                        <img src={items} />
                                      </SwiperSlide>
                                    );
                                  })}
                                </Swiper>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>

                  {/* PUBLICIDAD #2 */}
{/* 
                  {vistaMobile === true && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[11] != null &&
                    (listPublicidades.data[11].type == "video/mp4" ?
                      <div className="contenedor-banner-publicidad-segunda">
                        <div className="banner-principal-post-completo">
                          <video
                            muted
                            autoPlay
                            loop
                            playsinline
                            className="foto-banner-publicidad"
                            alt="foto-publicidiad"
                            src={listPublicidades.data[11].path}
                          />
                        </div>
                      </div>
                      :
                      (<div className="box-publicacion-post-completo-footer">
                        <img
                          className="foto-publicacion-vertical"
                          alt="foto-publi"
                          src={listPublicidades.data[11].path}
                        />
                      </div>)
                    )}

                  {vistaMobile === false && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[10] != null &&
                    (listPublicidades.data[10].type == "video/mp4" ?
                      <div className="contenedor-banner-publicidad-segunda">
                        <div className="banner-principal-post-completo">
                          <video
                            muted
                            autoPlay
                            loop
                            playsinline
                            className="foto-banner-publicidad"
                            alt="foto-publicidiad"
                            src={listPublicidades.data[10].path}
                          />
                        </div>
                      </div>
                      :
                      (<div className="box-publicacion-post-completo-footer">
                        <img
                          className="foto-publicacion-vertical"
                          alt="foto-publi"
                          src={listPublicidades.data[10].path}
                        />
                      </div>)
                    )} */}
                                          {vistaMobile === true && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[11] != null &&
                        (listPublicidades.data[11].type == "video/mp4" ?
                          <div className="contenedor-banner-publicidad-segunda">
                            <div className="banner-principal-post-completo">
                              <a target="_blank" rel="noreferrer" href={listPublicidades.data[11].url}>
                              <video src={listPublicidades.data[11].path} alt="foto-publicidiad" className="foto-banner-publicidad" autoPlay muted loop playsInline />
                              </a>
                            </div>
                          </div>
                          :
                          (<div className="box-publicacion-post-completo">
                            <a target="_blank" rel="noreferrer" href={listPublicidades.data[11].url}>
                              <img
                                className="foto-publicacion-vertical"
                                alt="foto-publi"
                                src={listPublicidades.data[11].path}
                              />
                            </a>
                          </div>)
                        )}

                      {vistaMobile === false && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[10] != null &&
                        (listPublicidades.data[10].type == "video/mp4" ?
                          <div className="contenedor-banner-publicidad-segunda">
                            <div className="box-publicacion-post-completo-footer">
                              <a target="_blank" rel="noreferrer" href={listPublicidades.data[10].url}>
                                <video
                                  muted
                                  autoPlay
                                  loop
                                  playsinline
                                  className="foto-banner-publicidad"
                                  alt="foto-publicidiad"
                                  src={listPublicidades.data[10].path}
                                />
                              </a>
                            </div>
                          </div>
                          :
                          (<div className="box-publicacion-post-completo-footer">
                            <a target="_blank" rel="noreferrer" href={listPublicidades.data[10].url}>
                              <img
                                className="foto-publicacion-vertical"
                                alt="foto-publi"
                                src={listPublicidades.data[10].path}
                              />
                            </a>
                          </div>)
                        )}


                  {data != null && data.redactor != null && (
                    <div className="box-parrafo-secundario">
                      <Link
                        to={"/periodista/" + data.redactor.nombre}
                        className="box-autor-post-completo"
                        onClick={() => {
                          localStorage.setItem("dataPeriodista", JSON.stringify(data.redactor));
                        }}
                      >
                        <Avatar
                          size="lg"
                          circle
                          src={data.redactor.path}
                          alt="@SevenOutman"
                        />
                        <p className="subtitulo-rojo-principal">
                          Por {data.redactor.nombre}
                        </p>
                      </Link>
                    </div>
                  )}
                  <CardsConTituloOeste />
                </div>

                <div className="box-banner-publicacion-post-completo">
                  {/* PUBLICIDAD #3 */}
                  {/* {vistaMobile === true && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[13] != null &&
                    (listPublicidades.data[13].type == "video/mp4" ?
                      <div className="contenedor-banner-publicidad-segunda">
                        <div className="banner-principal-post-completo">
                          <video
                            muted
                            autoPlay
                            loop
                            playsinline
                            className="foto-banner-publicidad"
                            alt="foto-publicidiad"
                            src={listPublicidades.data[13].path}
                          />
                        </div>
                      </div>
                      :
                      (<div className="box-publicacion-post-completo">
                        <img
                          className="foto-publicacion-vertical"
                          alt="foto-publi"
                          src={listPublicidades.data[13].path}
                        />
                      </div>)
                    )}

                  {vistaMobile === false && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[12] != null &&
                    (listPublicidades.data[12].type == "video/mp4" ?
                      <div className="contenedor-banner-publicidad-segunda">
                        <div className="banner-principal-post-completo">
                          <video
                            muted
                            autoPlay
                            loop
                            playsinline
                            className="foto-banner-publicidad"
                            alt="foto-publicidiad"
                            src={listPublicidades.data[12].path}
                          />
                        </div>
                      </div>
                      :
                      (<div className="box-publicacion-post-completo">
                        <img
                          className="foto-publicacion-vertical"
                          alt="foto-publi"
                          src={listPublicidades.data[12].path}
                        />
                      </div>)
                    )} */}
                     {vistaMobile === true && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[13] != null &&
                        (listPublicidades.data[13].type == "video/mp4" ?
                          <div className="contenedor-banner-publicidad-segunda">
                            <div className="banner-principal-post-completo">
                              <a target="_blank" rel="noreferrer" href={listPublicidades.data[13].url}>
                                <video src={listPublicidades.data[13].path} alt="foto-publicidiad" className="foto-banner-publicidad" autoPlay muted loop playsInline />
                              </a>
                             
                            </div>
                          </div>
                          :
                          (<div className="box-publicacion-post-completo">
                            <a target="_blank" rel="noreferrer" href={listPublicidades.data[13].url}>
                              <img
                                className="foto-publicacion-vertical"
                                alt="foto-publi"
                                src={listPublicidades.data[13].path}
                              />
                            </a>
                          </div>)
                        )}
                      {vistaMobile === false && listPublicidades != null && listPublicidades.data != null && listPublicidades.data[12] != null &&
                        (listPublicidades.data[12].type == "video/mp4" ?
                          <div className="contenedor-banner-publicidad-segunda">
                            <div className="banner-principal-post-completo">
                              <a target="_blank" rel="noreferrer" href={listPublicidades.data[12].url}>
                                <video
                                  muted
                                  autoPlay
                                  loop
                                  playsinline
                                  className="foto-banner-publicidad"
                                  alt="foto-publicidiad"
                                  src={listPublicidades.data[12].path}
                                />
                              </a>
                            </div>
                          </div>
                          :
                          (<div className="box-publicacion-post-completo">
                            <a target="_blank" rel="noreferrer" href={listPublicidades.data[12].url}>
                              <img
                                className="foto-publicacion-vertical"
                                alt="foto-publi"
                                src={listPublicidades.data[12].path}
                              />
                            </a>
                          </div>)
                        )}

                  <div className="box-vacio-publicacion"></div>
                  <div className="contenedor-destacadas">
                    <div className="box-titulo-destacados">
                      <p className="subtitulo-rojo-principal">
                        Noticias destacadas
                      </p>
                    </div>
                    <div>
                      <TarjetasverticalesOeste dataCards={listParaPublicacion != null && listParaPublicacion.data != null && listParaPublicacion.data[3]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {vistaMobile === true ? (
              ""
            ) : (
              arregloBusquedaCompleta != null ?
                <>
                  <SeccionTituloOeste titulo={"RECIENTES"} />
                  <CardsConTituloOeste dataCards={arregloBusquedaCompleta} />
                </>
                :
                <Loading />
            )}
          </div>

          <FooterOeste />
        </div>
      </animated.div>
      {/* </ThemeContext.Provider> */}
    </>
  )
}

export default PostCompletoOeste