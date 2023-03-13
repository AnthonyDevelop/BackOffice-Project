import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from "rsuite";
import { useSpring, animated } from "react-spring";

import './inicio.css';

export default function Inicio() {

  const dataUser = useSelector((state) => state.reducerDataUser.data);
  const listaPostUsuario = useSelector((state) => state.reducerListPostUser.data);

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 700,
  });

  //LISTA ULTIMOS POST USER
  if (listaPostUsuario != null && listaPostUsuario.data != "") {
    const listPostUser = listaPostUsuario.data[0].ultimosSubidos;
    var arrayUltimosPostUser = [];
    for (var e = 0; e < listPostUser.length; e++) {
      arrayUltimosPostUser.push(
        <>
          <div className="container-lista-post-user">
            <Badge color="green"></Badge>
            <div>
              <div className="header-entrada-tittle">
                <div className="box-categoria-vistas">
                  <p className="entrada-categorias">
                    {listPostUser[e].categorias.map((item, key) => {
                      return (item.nombre + ', ')
                    })}
                  </p>
                  <p>Vistas : {listPostUser[e].views}</p>
                </div>

              </div>
              <Link to={listPostUser[e].medios!=null && listPostUser[e].medios[0].nombre=="Editor Platense" ? "/"  + listPostUser[e].path : listPostUser[e].medios!=null && listPostUser[e].medios[0].nombre=="Oeste Platense" ? "/suplemento/op/" + listPostUser[e].path:""}>
                <div className="tittle-list-post">“{listPostUser[e].titulo}”</div>
              </Link>

              {/* <div className="tittle-list-post">Vistas : {listPostUser[e].views}  </div> */}
            </div>
          </div>
        </>
      );
    }
  }


  //LISTA MAS LEIDAS POST USER
  if (listaPostUsuario != null && listaPostUsuario.data != "") {
    const listPostUser = listaPostUsuario.data[1].masLeidos;
    var arrayListaPostUser = [];
    for (var e = 0; e < listPostUser.length; e++) {
      arrayListaPostUser.push(
        <>
          <div className="container-lista-post-user">
            <Badge color="green"></Badge>
            <div>
              <div className="header-entrada-tittle">
                <div className="box-categoria-vistas">
                  <p className="entrada-categorias">
                    {listPostUser[e].categorias.map((item, key) => {
                      return (item.nombre + ', ')
                    })}
                  </p>
                  <p>Vistas : {listPostUser[e].views}</p>
                </div>
              </div>
              <div className="tittle-list-post">“{listPostUser[e].titulo}”  </div>
            </div>
          </div>
        </>
      );
    }
  }

  const [mostrarImagenPerfil, setMostrarImagenPerfil] = useState("https://res.cloudinary.com/grupo-delsud/image/upload/v1670252546/eleditorNoticias/Group_17778_ujcekc_1_otlhmv.svg");
  useEffect(() => {
    if (dataUser != null && dataUser.data.pathFotoPerfil != "Sin Foto") {
      setMostrarImagenPerfil(dataUser.data.pathFotoPerfil)
    }
  }, [dataUser]);

  return (
    <>
      <animated.div style={fadeOut}>
        <div className='container-entradas'>
          <div className="container-perfil">
            <img width={110} height={110} src={mostrarImagenPerfil} />
            <h2> ¡Hola <span>{dataUser != null ? dataUser.data.nombre : ''}</span>!</h2>
          </div>
          <div className="container-inicio-post">
            <div className="child-container-left-post">
              <div className="container-inicio-subtittle-post">
                <p>¿Qué noticias tenés para contar?</p>
              </div>
              <Link className="button-crear-categoria" to="/panel-user/nueva-entrada">Publicar</Link>
              <div className="container-inicio-tusnotas">
                <p>Tus últimas notas</p>
              </div>
              <div className="box-principal-array">
                {/* ULTIMAS 10 NOTAS */}
                {arrayUltimosPostUser}
              </div>
            </div>
            <div className="child-container-right-post">
              <div className="container-subir-image">
                <p className="tittle-subir">Subí contenido multimedia a la plataforma.</p>
                <p className="subtittle-text"> Formatos admitidos: .PDF, .mp4, .jpg, .png, .webp,.mov, (ver otros).</p>
              </div>
              <Link className="button-crear-categoria" to="/panel-user/medios">Elegir archivos</Link>
              <div className="container-inicio-tusnotas">
                <p>Tus notas más leídas </p>
              </div>
              <div>
                {/* ULTIMAS 10 NOTAS MAS LEIDAS */}
                {arrayListaPostUser}
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  )
}
