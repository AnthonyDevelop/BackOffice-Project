import React from 'react'
import { Link } from 'react-router-dom';


function PortadaRepetidaOeste(props) {

    const portadaPrincipal = props.dataPortadaPrincipal;
    console.log(portadaPrincipal.nombreAutor)

    return (
      <Link to={"/suplemento/op/" + portadaPrincipal.path} onClick={() => {localStorage.setItem("dataPostNota", JSON.stringify(portadaPrincipal))}} >
        <div className='container-principal-home-repetida'>
            <div className='subcontainer-home-repetida'>
                <div className='box-foto-home-repetida'>
                    <img className='foto-principal' alt='foto-principal' src={portadaPrincipal.pathPortada} />
                    <div className='contenedor-border-verde'>
                        <div className='border-rojo-oeste-caja'>
                        </div>
                    </div>
                </div>
                <div className='box-texto-home-repetida'>
                    <h1 className='titulo-principal-home-repetida'>{portadaPrincipal.titulo}</h1>
                    <p className='subtitulo-rojo-oeste-principal-home-repetida'>Por {portadaPrincipal.redactor!=null && portadaPrincipal.redactor.nombre}</p>
                    <p className='texto-informacion-principal-home-repetida'>{portadaPrincipal.subtitulo}</p>
                </div>
            </div>
        </div>
        </Link>      
    )
}

export default PortadaRepetidaOeste