import React from 'react'

function SeccionCardsSinTitulo(props) {

    const arregloPostSection2 = props.dataCards;

    return (
        <>
        <div className='contenedor-card-recientes'>
            <div className='subbox-cards-recientes'>
                <div className='container-card'>
                    {arregloPostSection2}
                </div>
            </div>
        </div>
        </>
    )
}

export default SeccionCardsSinTitulo