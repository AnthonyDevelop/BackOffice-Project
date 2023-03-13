import React from 'react'

import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';


function TarjetasHorizontalesOeste(props) {

  const vistaMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
console.log(props.dataTarjetaHorizontales)
  var arregloTarjetas = []
  if (props.dataTarjetaHorizontales != null) {
    for (let i = 0; i < props.dataTarjetaHorizontales.length; i++) {
      arregloTarjetas.push(
        <Link to={"/suplemento/op/" + props.dataTarjetaHorizontales[i].path} onClick={() => {localStorage.setItem("dataPostNota", JSON.stringify(props.dataTarjetaHorizontales[i]))}} >
          <div className='tarjetaHorizontal' key={props.dataTarjetaHorizontales[i].id} >

            <img className='foto-tarjeta-horizontal' alt='foto' src={props.dataTarjetaHorizontales[i] != null ? props.dataTarjetaHorizontales[i].pathPortada : ''} />  
            <div className='linea-roja'></div>
            <div className='box-texto-tarjetas-horizontal'>
              <div className='container-post-categoria-oeste'> {props.dataTarjetaHorizontales[i].categorias[0].nombre=="DESTACADO_PPAL" || props.dataTarjetaHorizontales[i].categorias[0].nombre=="DESTACADO_VIEW" ? props.dataTarjetaHorizontales[i].categorias[1].nombre : props.dataTarjetaHorizontales[i].categorias[0].nombre}</div> 

              <p className='titulo-tarjeta-horizontal'>{props.dataTarjetaHorizontales[i].titulo}</p>
              <p className='subtitulo-tarjeta-horizontal'>{props.dataTarjetaHorizontales[i].subtitulo}</p>
              <p className='autor-tarjeta-horizontal-oeste'>Por {props.dataTarjetaHorizontales[i].redactor.nombre}</p>
            </div>
          </div>
        </Link>
      );
    }
  }

  return (
    <>
        <div className='contenedor-tarjetas-recientes'>
          <div className='subbox-tarjetas-recientes'>
            <div className='container-tarjetas'>
              {arregloTarjetas}
            </div>
          </div>
        </div>
   
    </>
  )
}

export default TarjetasHorizontalesOeste