import React from 'react'

function CardsConTituloOeste(props) {

  const arregloPostSection1 = props.dataCards;
    return (
        <>
        <div className='contenedor-card-recientes'>
            <div className='subbox-cards-recientes'>
                <div className='container-card'>
                    {arregloPostSection1}
                </div>
            </div>
        </div>
        </>
    )
}

export default CardsConTituloOeste