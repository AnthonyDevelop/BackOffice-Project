import React from 'react'
import ReproductorOeste from '../web/youtube/ReproductorOeste';
function YoutubeOeste(props) {

    return (
        <>
            <div className='conteiner-banner-youtube'>
                <div className='contenedor-youtube'>
                    <div className="contenedor-youtube-reproductor">
                        <div className='box-titulo-video'>
                            <h2>Visita nuestro canal de Youtube</h2>
                            <div className='border-verde-youtube-titulo'></div>
                        </div>
                        <ReproductorOeste link={"OYCAJ2CT3rE"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default YoutubeOeste