// import './footer.css';
import { useMediaQuery } from 'react-responsive';


export default function FooterOeste() {


    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Setiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
    
      const diaPosteo = new Date().getDate();
      const arrayMesPosteo = new Date();
      var mesPosteo = meses[arrayMesPosteo.getMonth()];
      const anoPosteo = new Date().getFullYear();

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const vistaMobile = useMediaQuery({
        query: "(max-width: 767px)",
    });

    var d = new Date("20 Mar 2018 15:12:00 GMT");
    var hoy = new Date();
    var diferencia_dias = hoy.getTime() - d.getTime();    
    var segundos = Math.floor(diferencia_dias / 1000);
    var minutos = Math.floor(segundos / 60);
    var horas = Math.floor(minutos / 60);
    var diaEdicion = Math.floor(horas / 24);    
    horas %= 24;  

    return (
        <>
            <div className='container-principal-footer-gris'>
                <div className='subcontainer-footer'>
                    <div className='box-informacion-footer'>
                        {vistaMobile === true ?
                            <div className='box-imagen-footer'>
                                <img width={150} src='https://res.cloudinary.com/grupo-delsud/image/upload/v1669131846/eleditorNoticias/loogo-mobile_dsrfyh.svg' alt='logo-editor' />
                            </div>
                            :
                            <div className='box-imagen-footer'>
                                <img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668300669/eleditorNoticias/Group_1_vwyayi.png' alt='logo-editor' />
                            </div>
                        }
                        <div className='box-texto-footer'>
                            <p className='info-footer'>El Editor Platense</p>
                            <p className='info-footer'>Propietario: <b>Laniakea SAS</b></p>
                            <p className='info-footer'>Director: <b>Axel Laurini</b></p>
                            <p className='info-footer'>DNDA: <b>En trámite</b></p>
                            <p className='info-footer'>Domicilio legal: <b>Av. 7 n° 840 - La Plata, Buenos Aires.</b></p>
                            <p className='info-footer'>Edición <b>{diaEdicion}</b></p>
                            <p className='box-texto-footer-line-oeste'>{diaPosteo + " de " + mesPosteo + " de " + anoPosteo}</p>
                        </div>
                        <div>
                            <p className='ultimo-text'>Copyright 2023 El Editor Platense. Todos los derechos reservados.</p>
                        </div>
                    </div>
                    <div className='box-redes-footer'>
                        <div className='subbox-redes-footer'>
                            <a href='https://www.facebook.com/eleditorplatense' target="_blank" className='contenedor-redes'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1670848451/eleditorNoticias/Vector_5_x4mtoj.svg' /></a>
                            <a href='https://www.youtube.com/@ElEditorPlatense' target="_blank" className='contenedor-redes'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1670848451/eleditorNoticias/Vector_6_smpz2h.svg' /></a>
                            <a href='https://www.instagram.com/eleditorplatense/?hl=es' target="_blank" className='contenedor-redes'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1670848451/eleditorNoticias/Vector_7_otlu0o.svg' /></a>
                            <a href='https://twitter.com/editor_platense' target="_blank" className='contenedor-redes'><img src='https://res.cloudinary.com/grupo-delsud/image/upload/v1670848451/eleditorNoticias/Vector_8_c3umbl.svg' /></a>
                        </div>
                        <div className='subbox-redes-scroll'>
                            <div className='button-scrollToTop'>
                                <img className='fotoFlecha' onClick={ScrollToTop} src='https://res.cloudinary.com/grupo-delsud/image/upload/v1668773622/eleditorNoticias/Vector_qu44yl.svg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}