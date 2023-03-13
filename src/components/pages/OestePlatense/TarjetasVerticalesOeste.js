import React, { useEffect } from 'react'

import { useMediaQuery } from 'react-responsive';

import { useSelector, useDispatch } from "react-redux";
import { getRecibirPosts } from '../../../actions/ElEditor/listaPublicaciones';
import './OesteHome.css'
import { Link } from 'react-router-dom';


function TarjetasverticalesOeste(props) {

  const listParaPublicacion = props.dataCards;
  const vistaMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });



  return (
    <>
      <div className="contenedor-tarjetas-recientes">
        <div className="subbox-tarjetas-recientes-vertical">
          <div className="container-tarjetas-vertical">
            {listParaPublicacion != null && listParaPublicacion != false && 
           
            listParaPublicacion.map((item, key) => {
              if(key<8){
                return(
                  <Link
                  to={"/suplemento/op/" +  item.data.path}
                  onClick={() => {
                    localStorage.setItem(
                      "dataPostNota",
                      JSON.stringify(item.data)
                    );
                  }}
                >
                  <div className="tarjeta-vertical " key={key}>
                  <div className="foto-tarjeta-vertical border-right-oeste">
                    <img
                      alt="foto"
                      src={item.data.pathPortada}
                    />
                  </div>
                  <div className="box-texto-tarjetas-vertical">
                          <div className="container-categoria-tarjeta-vertical-oeste">
                            {" "}
                            {item.categoria != null &&
                              item.categoria}
                          </div>
                          <p className="titulo-tarjeta-vertical">
                            {item.data.titulo}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                }


              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default TarjetasverticalesOeste