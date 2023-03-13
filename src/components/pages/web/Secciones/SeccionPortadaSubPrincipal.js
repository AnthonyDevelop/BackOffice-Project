import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

export default function SeccionPortadaSubPrincipal(props) {
    const data=props.dataPortadaSubPrincipal;
    const nombreArreglo=props.nombreArreglo;
    let arregloSubprincipal=[]


    const vistaMobile = useMediaQuery({
      query: "(max-width: 767px)",
  });
   
      for (let i = 1; i < 3; i++) {
        if (data[i] != null) {
        arregloSubprincipal.push(
          <Link to={data[i].path} onClick={() => {localStorage.setItem("dataPostNota", JSON.stringify(data[i]))}} >
        <div className={i==2 && !vistaMobile ? 'box-portada-subprincipal child-card-borde'  : i==2 && vistaMobile ? 'box-portada-subprincipal child-card-borde-top' : 'box-portada-subprincipal'} >
        <div className='box-portada-subprincipal-image-secction'>
            <div className='container-post-categoria'>                                  
            {(i === 1 && nombreArreglo === "Leidos") ? "Gimnasia" :
              (i === 2 && nombreArreglo === "Leidos") ? "Estudiantes" :
              (data[i].categorias[0].nombre === "DESTACADO_PPAL" || data[i].categorias[0].nombre === "DESTACADO_VIEW")
                ? (data[i].categorias[1] !== null && data[i].categorias[1].nombre === "DESTACADO_VIEW")
                  ? (data[i].categorias[2] !== null ? data[i].categorias[2].nombre : null)
                  : data[i].categorias[1].nombre
                : data[i].categorias[0].nombre}          
       </div> 

            <img  alt='foto' src={data[i].pathPortada} /> 
        </div> 
        <div className={ i==1 && nombreArreglo=="Leidos" ? 'box-portada-subprincipal-text-secction text-secction-gimnasia' : i==2 && nombreArreglo=="Leidos" ? 'box-portada-subprincipal-text-secction text-secction-estudiantes' : "box-portada-subprincipal-text-secction" }>
            <p className='titulo-tarjeta'>{data[i].titulo}</p>            
            <p className='autor-tarjeta'>Por <b>{data[i].redactor.nombre}</b></p>
            <p className='subtitulo-tarjeta'>{data[i].subtitulo}</p>
        </div>
    </div>
          </Link>
        );
      }
    }


  return (
    <div className='box-portada-subprincipal-container'>
    {arregloSubprincipal}
    </div>
  )
}
