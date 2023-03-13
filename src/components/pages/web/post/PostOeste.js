import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import './post.css';
import '../home.css';

export default function PostOeste(props) {
    const posteo = props.post;
    const posicion = props.pos;
    const nombreArreglo = props.nombreArreglo;
    const [nombreCategoria, setNombreCategoria] = useState("");

    const vistaMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });
    const [nombreClase, setNombreClase] = useState("");

    useEffect(() => {
        if (nombreArreglo == "Cronologico") {
            if (!vistaMobile) {
                if (posicion === 0 || posicion === 6 || posicion === 9) {
                    setNombreClase('child-card')
                }
                if (posicion === 3) {
                    setNombreClase("child-card child-card-borde-bottom-oeste")
                }
                if (posicion === 4 || posicion === 5) {
                    setNombreClase('child-card  child-card-borde-oeste child-card-borde-bottom-oeste')
                }
                if (posicion === 1 || posicion === 2 || posicion === 10 || posicion === 11) {
                    setNombreClase("child-card child-card-borde-oeste")
                }
                if (posicion === 6) {
                    setNombreClase("child-card child-card-borde-top-oeste")
                }
                if (posicion === 7 || posicion === 8) {
                    setNombreClase("child-card child-card-borde-oeste child-card-borde-top-oeste")
                }
            }
            if (vistaMobile) {
                if (posicion === 1 || posicion === 3 || posicion === 5) {
                    setNombreClase("child-card child-card-borde")
                }
                if (posicion === 0 || posicion === 2 || posicion === 4) {
                    setNombreClase("child-card")
                }
            }

        }
        if (nombreArreglo == "Leidos") {
            if (!vistaMobile) {
                if (posicion === 3) {
                    setNombreClase('child-card')
                }
                if (posicion === 4 || posicion === 5) {
                    setNombreClase("child-card child-card-borde-oeste")
                }
                if (posicion === 6) {
                    setNombreClase("child-card child-card-borde-bottom-oeste")
                }
                if (posicion === 8 || posicion === 7) {
                    setNombreClase('child-card child-card-borde-oeste child-card-borde-bottom-oeste')
                }
            }
            if (vistaMobile) {
                if (posicion === 2 || posicion === 4 || posicion === 6) {
                    setNombreClase("child-card child-card-borde-oeste")
                }
                if (posicion === 1 || posicion === 3 || posicion === 5) {
                    setNombreClase("child-card")
                }
            }

        }
    }, [posicion]);

    useEffect(() => {
        if (posteo.categorias != null && posteo.categorias[0] != null) {
            if (posteo.categorias[0].nombre == "DESTACADO_PPAL" || posteo.categorias[0].nombre == "DESTACADO_VIEW") {
                if (posteo.categorias[1] != null && posteo.categorias[1].nombre == "DESTACADO_VIEW") {
                    if (posteo.categorias[2] != null) {
                        setNombreCategoria(posteo.categorias[2].nombre);
                    }
                }
                if (posteo.categorias[1] != null && posteo.categorias[1].nombre != "DESTACADO_VIEW") {
                    setNombreCategoria(posteo.categorias[1].nombre)
                }
            } else {
                //  setNombreCategoria(dataKeyCategoria != null && posteo.categorias.includes(dataKeyCategoria.nombre) ? 
                //  dataKeyCategoria.nombre : posteo.categorias[0].nombre);
                setNombreCategoria(posteo.categorias[0].nombre)
            }
        }
        if(props.filterCategoria != null){
            setNombreCategoria(props.filterCategoria);
        }
        
    }, [posicion, props.filterCategoria]);

    return (

        <>
            <Link to={"/suplemento/op/" + posteo.path} onClick={() => { localStorage.setItem("dataPostNota", JSON.stringify(posteo)) }} className={nombreClase}
                key={posteo.id}>
                <div className='container-post-img'>
                    <div className='container-post-categoria-oeste'>
                        {nombreCategoria}                        </div>
                    <img alt='foto' className='img-style' src={posteo.pathPortada} />
                </div>
                <div className='container-post-text container-post-text-oeste'>
                    <h3>{posteo.titulo}</h3>
                    <h4>Por {posteo.redactor.nombre}</h4>
                    <p>{posteo.subtitulo}</p>
                </div>
            </Link>

        </>
    );
}

// state={{ data: posteo}}