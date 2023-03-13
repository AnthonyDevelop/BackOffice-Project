import React from 'react'

export default function SeccionTitulo(props) {
   const  titulo = props.titulo;
    return (
        <>
            <div className='contenedor-titulo'>
                <div className='subbox-titulo'>
                    <div className='box-etiqueta-titulo'>
                        <div className='box-etiqueta'>
                            <h2 className='titulo-etiqueta'>{titulo}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
