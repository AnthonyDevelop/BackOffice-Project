import React from 'react'

function SeccionCardsConTitulo(props) {
    return (
        <>
            <div className='contenedor-card-recientes'>
                <div className='subbox-cards-recientes'>
                    <div className='container-card'>
                        {props.dataCards}
                        {/* {arregloPostSection1 !=null && arregloPostSection1.length > 0 ?
                            arregloPostSection1
                            :
                            <>
                                <div className='subbox-cards-recientes-sin-resultados'>
                                    <h1>No se encontraron resultados</h1>
                                </div>
                            </>} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeccionCardsConTitulo