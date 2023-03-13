import React from 'react'

export default function SeccionTituloOeste(props) {
    const  titulo = props.titulo;
    return (
        <>
            <div className='contenedor-titulo'>
                <div className='subbox-titulo'>
                    <div className='box-etiqueta-titulo-oeste'>
                        <div className='box-etiqueta-oeste'>
                            <h2 className='titulo-etiqueta'>{titulo}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
