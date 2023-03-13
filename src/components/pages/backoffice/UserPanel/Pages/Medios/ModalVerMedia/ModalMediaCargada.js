import React, { useState } from 'react'
import { Modal, Button } from 'rsuite';
import { BsFillCheckCircleFill } from 'react-icons/bs';


function ModalMediaCargada(props) {
  const [backdrop, setBackdrop] = useState('static');
  const openExitoso = props.openExitoso;
  const setOpenExitoso = props.setOpenExitoso;
  const handleClose = () => {
    // descartarEntrada();
    setOpenExitoso(false);
  }



  return (
    <>
      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openExitoso}>
        <Modal.Body>
          <div className="container-text-modal inline-text">
            <BsFillCheckCircleFill />
            <h4>Contenido cargado correctamente</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button className="boton-cerrar" onClick={handleClose} >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalMediaCargada