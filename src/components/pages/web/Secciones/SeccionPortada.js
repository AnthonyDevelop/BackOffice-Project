import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';


function SeccionPortada(props) {
    const portadaPrincipal = props.dataPortadaPrincipal;

    return (        
        <Link className='post-portada' to={portadaPrincipal.path} onClick={() => {localStorage.setItem("dataPostNota", JSON.stringify(portadaPrincipal))}} >
            <div className='container-principal-home'>
                <div className='subcontainer-home'>
                    <div className='box-foto'>
                        <img className='foto-principal' alt='foto-principal' src={portadaPrincipal.pathPortada} />
                        <div className='contenedor-border-verde'>
                            <div className='border-verde-caja'>
                            </div>
                        </div>
                    </div>
                    <div className='box-texto'>
                        <h1 className='titulo-principal'>{portadaPrincipal.titulo}</h1>
                        <p className='subtitulo-verde-principal'>Por {portadaPrincipal.redactor!=null && portadaPrincipal.redactor.nombre}</p>
                        <p className='texto-informacion-principal'>{portadaPrincipal.subtitulo}</p>
                    </div>
                </div>
            </div>
        </Link>     
    )
}

export default SeccionPortada