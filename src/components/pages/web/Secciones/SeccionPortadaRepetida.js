import React from 'react'
import { Link } from 'react-router-dom';


function SeccionPortadaRepetida(props) {

    const portadaPrincipal = props.dataPortadaPrincipal;

    return (
      <Link className='post-portada' to={portadaPrincipal.path} onClick={() => {localStorage.setItem("dataPostNota", JSON.stringify(portadaPrincipal))}} >
        <div className='container-principal-home-repetida'>
            <div className='subcontainer-home-repetida'>
                <div className='box-foto-home-repetida'>
                    <img className='foto-principal' alt='foto-principal' src={portadaPrincipal.pathPortada} />
                    <div className='contenedor-border-verde'>
                        <div className='border-verde-caja'>
                        </div>
                    </div>
                </div>
                <div className='box-texto-home-repetida'>
                    <h1 className='titulo-principal-home-repetida'>{portadaPrincipal.titulo}</h1>
                    <p className='subtitulo-verde-principal-home-repetida'>Por  {portadaPrincipal.redactor!=null && portadaPrincipal.redactor.nombre}</p>
                    <p className='texto-informacion-principal-home-repetida'>{portadaPrincipal.subtitulo}</p>
                </div>
            </div>
        </div>
        </Link>      
    )
}

export default SeccionPortadaRepetida