import React, {useRef, useEffect} from "react";
import { useMediaQuery } from 'react-responsive';
import Plyr from 'plyr';

function handleVideoPlay() {
  const videoElement = document.getElementById('home_video');
  if (videoElement.playing) {
    // video is already playing so do nothing
  } else {
    // video is not playing so play video now
    videoElement.play();
  }
}


function SeccionPublicidadInvidual(props) {
   const publicidadDesk= props.publicidadDesk;
   const publicidadMob= props.publicidadMob;
   const tipoDePubli = props.tipoDePubli;


    const vistaMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });



      const player = new Plyr('#video-player-publicidad-home', {
        autoplay: true,
        controls: false,
        muted: true,
        playsinline: true,
        i18n: {
          speed: 'Velocidad'
        },
      });


    return (
        <>
        <div className='contenedor-banner-publicidad'>       
            {publicidadDesk!=null && tipoDePubli=="simple" && publicidadDesk.path!="Sin Publicidad" && !vistaMobile &&
            <div className='banner-principal'>
                {publicidadDesk.type=="image/png" || publicidadDesk.type=="image/gif" || publicidadDesk.type=="image/jpeg"  || publicidadDesk.type=="image/jpg" || publicidadDesk.type=="image/webp" ?      
                    <a target="_blank" href={publicidadDesk.url}>                                 
                   <img alt='foto-publicidiad' src={publicidadDesk.path} />
                   </a> 
                   :
                   <a target="_blank" href={publicidadDesk.url}>           
                    <video  src={publicidadDesk.path} autoPlay muted loop playsInline type={publicidadDesk.type}/>
                  </a> 
                    
                }
            </div>}
            {publicidadMob!=null && tipoDePubli=="simple" && publicidadDesk.path!="Sin Publicidad" && vistaMobile &&
            <>
            <div className='banner-principal'>
                {publicidadMob.type=="image/png" || publicidadMob.type=="image/gif" || publicidadMob.type=="image/jpeg"  || publicidadMob.type=="image/jpg" || publicidadMob.type=="image/webp" ?      
                    <a target="_blank" href={publicidadMob.url}>                                 
                   <img alt='foto-publicidiad' src={publicidadMob.path} />
                   </a> 
                   :
                   <>
                    <div className='banner-principal'>
                      <video src={publicidadMob.path} autoPlay muted loop playsInline />
                    </div>
                  </>
                }
            </div>
            </>
            }

            {publicidadDesk!=null && tipoDePubli=="dual" && publicidadDesk[4]!=null & publicidadDesk[7]!=null && !vistaMobile &&       
            <>       
            <div className='banner-principal-dual'>
                {publicidadDesk[5].path!="Sin Publicidad" &&
                <div className='dual-publicidad-column'>
                {publicidadDesk[5].type=="image/png" || publicidadDesk[5].type=="image/gif" || publicidadDesk[5].type=="image/jpeg"  || publicidadDesk[5].type=="image/jpg" || publicidadDesk[5].type=="image/webp"?    
                     <a target="_blank" href={publicidadDesk[5].url}>                                     
                   <img alt='foto-publicidiad' src={publicidadDesk[5].path} />
                   </a> 
                   :
                   <a target="_blank" href={publicidadDesk[5].url}>        
                        <video src={publicidadDesk[5].path} autoPlay muted loop playsInline type={publicidadDesk[4].type}/>
                   </a>   
                }
                </div>}
                {publicidadDesk[7].path!="Sin Publicidad" &&
                <div className='dual-publicidad-column'>
                {publicidadDesk[7].type=="image/png" || publicidadDesk[7].type=="image/gif" || publicidadDesk[7].type=="image/jpeg"  || publicidadDesk[7].type=="image/jpg" || publicidadDesk[7].type=="image/webp" ?   
                    <a target="_blank" href={publicidadDesk[7].url}>                               
                        <img alt='foto-publicidiad' src={publicidadDesk[7].path} />
                   </a> 
                   :
                   <a target="_blank" href={publicidadDesk[7].url}>     
                    <video src={publicidadDesk[7].path} autoPlay muted loop playsInline type={publicidadDesk[7].type}/>             
                  </a> 
                }
                </div>}

            </div>
            </>}

            
            {publicidadMob!=null && tipoDePubli=="dual" && publicidadMob[5]!=null & publicidadMob[8]!=null && vistaMobile &&       
            <>       
            <div className='banner-principal-dual'>
                {publicidadMob[5].path!="Sin Publicidad" &&
                <div className='dual-publicidad-column'>
                {publicidadMob[5].type=="image/png" || publicidadMob[5].type=="image/gif" || publicidadMob[5].type=="image/jpeg"  || publicidadMob[5].type=="image/jpg" || publicidadMob[5].type=="image/webp" ?    
                     <a target="_blank" href={publicidadMob[5].url}>                                     
                   <img alt='foto-publicidiad' src={publicidadMob[5].path} />
                   </a> 
                   :
                   <a target="_blank" href={publicidadMob[5].url}>        
                        <video src={publicidadMob[5].path} autoPlay muted loop playsInline type={publicidadMob[6].type}/>
                   </a>   
                }
                </div>}
                {publicidadMob[8].path!="Sin Publicidad" &&
                <div className='dual-publicidad-column'>
                {publicidadMob[8].type=="image/png" || publicidadMob[8].type=="image/gif" || publicidadMob[8].type=="image/jpeg"  || publicidadMob[8].type=="image/jpg" || publicidadMob[8].type=="image/webp" ?   
                    <a target="_blank" href={publicidadMob[8].url}>                               
                        <img alt='foto-publicidiad' src={publicidadMob[8].path} />
                   </a> 
                   :
                   <a target="_blank" href={publicidadMob[8].url}>     
                    <video src={publicidadMob[8].path} autoPlay muted loop playsInline type={publicidadMob[8].type}/>             
                  </a> 
                }
                </div>}

            </div>
            </>}
        </div>
        </>
    )
}

export default SeccionPublicidadInvidual