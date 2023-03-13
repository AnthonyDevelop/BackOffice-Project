import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';


function PortadaOeste(props) {
    const portadaPrincipal = props.dataPortadaPrincipal;
    return (        
        <Link to={"/suplemento/op/" +  portadaPrincipal.path} onClick={() => {localStorage.setItem("dataPostNota", JSON.stringify(portadaPrincipal))}} >
            <div className='container-principal-home'>
                <div className='subcontainer-home'>
                    <div className='box-foto'>
                        <img className='foto-principal' alt='foto-principal' src={portadaPrincipal.pathPortada} />
                        <div className='contenedor-border-verde'>
                            <div className='border-rojo-oeste-caja'>
                            </div>
                        </div>
                    </div>
                    <div className='box-texto'>
                        <h1 className='titulo-principal'>{portadaPrincipal.titulo}</h1>
                        <p className='subtitulo-rojo-oeste-principal'>Por {portadaPrincipal.redactor!=null && portadaPrincipal.redactor.nombre}</p>
                        <p className='texto-informacion-principal'>{portadaPrincipal.subtitulo}</p>
                    </div>
                </div>
            </div>
        </Link>     
    )
}

export default PortadaOeste