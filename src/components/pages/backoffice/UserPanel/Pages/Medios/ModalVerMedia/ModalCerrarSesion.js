import React, { useState } from 'react'
import { Modal, Button } from 'rsuite';



function ModalCerrarSesion(props) {
  const [backdrop, setBackdrop] = useState('static');
  const openCerrarSesion = props.openCerrarSesion;
  const setOpenCerrarSesion = props.setOpenCerrarSesion;
  const handleCloseCerrarSesion = props.handleCloseCerrarSesion;
  const cerrarSesion = props.cerrarSesion;

  return (
    <>
      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openCerrarSesion}>
        <Modal.Body>
          <div className="container-text-modal inline-text">
            <h4>¿Querés cerrar sesión?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button onClick={()=>{cerrarSesion();handleCloseCerrarSesion()}} className="boton-ir">
            Aceptar
          </Button>
          <Button className="boton-cerrar" onClick={handleCloseCerrarSesion} >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCerrarSesion