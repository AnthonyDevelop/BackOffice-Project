import React from 'react'
import Reproductor from '../youtube/Reproductor';
function SeccionYoutube(props) {

    return (
        <>
            <div className='conteiner-banner-youtube'>
                <div className='contenedor-youtube'>
                    <div className="contenedor-youtube-reproductor">
                        <div className='box-titulo-video'>
                            <h2>Visita nuestro canal de Youtube</h2>
                            <div className='border-verde-youtube-titulo'></div>
                        </div>
                        <Reproductor link={"OYCAJ2CT3rE"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeccionYoutube