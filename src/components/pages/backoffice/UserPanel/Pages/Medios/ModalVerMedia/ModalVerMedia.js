import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup } from 'rsuite';
import { Modal, Button } from 'rsuite';
import Plyr from 'plyr';
import { BiPencil } from 'react-icons/bi';



import './modalVerMedio.css';
import { NavItem } from "react-bootstrap";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

export default function ModalVerMedia(props) {
    const open = props.open;
    const setOpen = props.setOpen;
    const data=props.data;
    const dispatch = useDispatch();

    const [backdrop, setBackdrop] = useState('static');
    const [readOnly, setReadOnly] = useState(true);
    const [datoName, setDatoName] = useState();

    const handleClose = () => {
        setOpen(false)
        setDatoName(null)
        setReadOnly(true)
    };




      useEffect(() => {
        const player = new Plyr('#video-player-media',{
            i18n: {
              speed: 'Velocidad'
            },
          });
      }, [open]);

    return (
        <>
            {(open) &&
                <div>
                    <Modal backdrop={backdrop} open={open}  onClose={handleClose} className="modal-ver-medio" autoFocus={false}>
                        <Modal.Header>
                            <div>
                            </div>
                        </Modal.Header>
                        <form className="modal-ver-medio">
                            <div className="container-medio">
                                <div className="container-preview">
                                    {data.type=="image/png" || data.type=="image/gif" || data.type=="image/jpeg"  || data.type=="image/jpg" || data.type=="image/webp" ?                                        
                                    <   img width={500} height={500} src={data.path} />
                                        :
                                        <div className="video-post-container">
                                            <video id="video-player-media">
                                                <source src={data.path} type={data.type}/>
                                            </video>
                                      </div>
                                    }
                                                        </div>
                                <div className="container-description">  
                                    <div className="child-container-description">
                                        {/* <div className="container-row-input">
                                            <label>Título de imagen</label>
                                            <InputGroup inside  >
                                                <Input onChange={(e)=>setDatoName(e)} readOnly={readOnly} defaultValue={data.nombre} className={readOnly ? "input-medio" : "input-medio input-medio-editable" }/>
                                                <InputGroup.Button onClick={()=>setReadOnly(false)} className="boton-icono-input">
                                                    <BiPencil />
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </div> */}
                                        <p>Nombre del archivo: <b>{data.nombre}</b></p>
                                        <p>Subido el: <b>{moment(data.fechaSubida.date).format('LLL')}</b></p>
                                        <p>Subido por: <b>{data.subidoPor}</b></p>
                                        <p>Tipo de archivo: <b> {data.type}</b></p>
                                        <p>Tamaño del archivo: <b> {data.size}</b></p>
                                        <p>URL del archivo: <b> {data.path}</b></p>                                        
                                    </div>
                                    {readOnly==false && datoName!=null &&
                                    <button class="boton-guardar-cambios">Guardar cambios</button>}
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            }
        </>
    )
}
