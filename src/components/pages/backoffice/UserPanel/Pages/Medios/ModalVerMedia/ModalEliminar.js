import React, { useState } from 'react'
import { Modal, Button } from 'rsuite';



function ModalEliminar(props) {
  const [backdrop, setBackdrop] = useState('static');
  const openEliminar = props.openEliminar;
  const setOpenEliminar = props.setOpenEliminar;
  const handleClose = props.handleClose;
  const eliminarPosteo = props.eliminarPosteo;

  return (
    <>
      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openEliminar}>
        <Modal.Body>
          <div className="container-text-modal inline-text">
            <h4>Esta seguro de eliminar esta entrada?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button onClick={()=>{eliminarPosteo();handleClose()}} className="boton-ir">
            Eliminar
          </Button>
          <Button className="boton-cerrar" onClick={handleClose} >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEliminar