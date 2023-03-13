import React, { useEffect, useState,createRef } from "react";
import Footer from "../../../footer/Footer";
import NavbarEditor from '../../../navbar/Navbar'
import SeccionTitulo from "../Secciones/SeccionTitulo";
import "./farmacias.css"

export default function Farmacia() {

  const [theme, setTheme] = useState();
  

//   function disableSectionInIframe() {
//     const iframe = this.iframeRef.current;
//     const iframeDocument = iframe.contentDocument;
//     const section = iframeDocument.getElementById('header');
//     section.style.display = 'none';
//   }
  
//   useEffect(() => {
//     disableSectionInIframe()
// }, []);

  return (
    <>
      <NavbarEditor theme={theme} setTheme={setTheme} id={theme} />
      <div id={theme}>
        <div className='body-container farmacias-container ' id={theme}>
          <SeccionTitulo titulo='FARMACIAS DE TURNO' />
          <iframe 
          // ref={this.iframeRef}  
          width={"100%"} 
          height={"700"} 
          src="https://www.colfarmalp.org.ar/turnos-la-plata/">

          </iframe>
        </div>
      </div>
      <Footer />
    </>
  )
}
