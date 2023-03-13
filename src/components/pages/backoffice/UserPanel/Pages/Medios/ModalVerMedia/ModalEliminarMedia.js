import React, { useState } from 'react'
import { Modal, Button } from 'rsuite';



function ModalEliminarMedia(props) {
  const [backdrop, setBackdrop] = useState('static');
  const openEliminarMedia = props.openEliminarMedia;
  const setOpenEliminarMedia = props.setOpenEliminarMedia;
  const handleClose = props.handleClose;
  const setChecked = props.setChecked;
  const eliminarVideoUsuario = props.eliminarVideoUsuario;
  return (
    <>
      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openEliminarMedia}>
        <Modal.Body>
          <div className="container-text-modal inline-text">
            <h4>Esta seguro de eliminar esta media?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button 
              onClick={()=>{eliminarVideoUsuario();handleClose()}}
           className="boton-ir">
            Eliminar
          </Button>
          <Button className="boton-cerrar" 
          onClick={()=> {handleClose();setChecked([])}}
           >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEliminarMedia