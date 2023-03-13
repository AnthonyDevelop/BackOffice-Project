import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Button, ButtonToolbar, SelectPicker, ButtonGroup, Modal, IconButton, Toggle } from 'rsuite';

import { getDataUser } from "../../../../../../actions/dataUser";
import { setEditarUser } from "../../../../../../actions/dataUser";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useSpring, animated } from "react-spring";

import './perfil.css'

export default function Perfil() {
  const dispatch = useDispatch();

  const dataUser = useSelector((state) => state.reducerDataUser.data);

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 450,
  });

  const [activarEdit, setActivarEdit] = useState(true);
  const [imgData, setImgData] = useState()
  const [mostrarImagenPerfil, setMostrarImagenPerfil] = useState("https://res.cloudinary.com/grupo-delsud/image/upload/v1670252546/eleditorNoticias/Group_17778_ujcekc_1_otlhmv.svg");
  const [foto, setFile] = useState({ imagenPerfilUser: "" });
  const [errorType, setErrorType] = useState(false);

  const [nextStepModal, setNextStepModal] = useState(false);
  const [openPublicando, setOpenPublicando] = useState(false);
  const handleClose = () => { setOpenPublicando(false); }

  const mostrarImagenUser = (e) => {
    if(e.target.files[0].type=="video/mp4"){
      setErrorType(true)
    }
    if(e.target.files[0].type!="video/mp4"){
      if (e.target.files[0]) {
        setImgData(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setMostrarImagenPerfil(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
  }
  };

  useEffect(() => {
    if (dataUser != null && dataUser.data.pathFotoPerfil != "Sin Foto") {
      setMostrarImagenPerfil(dataUser.data.pathFotoPerfil)
    }
  }, [dataUser]);


  const onChangue = (event) => {
    setFile({
      ...foto,
      [event.target.name]: event.target.files[0]
    });
  }

  // ENVIAR FORMULARIO //
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {

    setActivarEdit(!activarEdit);
    const dataPerfil = {
      nombre: data.nombre,
      apellido: data.apellido,
      descripcion: data.descripcion,
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataPerfil));
    formData.append("fotoPerfil", imgData);
    dispatch(setEditarUser(formData));
    reset()
    setOpenPublicando(true);
    localStorage.removeItem("dataPeriodista");
  };

  const respuestaEditarUser = useSelector((state) => state.reducerRespuestaEditUser.data);
  useEffect(() => {
    if (respuestaEditarUser != null) {
      if (respuestaEditarUser.response === "Update Succesfull") {
        setNextStepModal(true);
        dispatch(getDataUser());
      }
    }
  }, [respuestaEditarUser])

  return (
    <>
      <animated.div style={fadeOut}>
        <div className='container-entradas'>
          <div className='container-tittle'>
            <h2>Perfil</h2>
          </div>
          <div className='container-description'>
            <form className='child-form-container-description' onSubmit={handleSubmit(onSubmit)} >
              <div className="container-foto">
                <div className="imagen-de-perfil">
                  <label htmlFor="imagenPerfil" disabled={activarEdit}
                    className={activarEdit != true ? "boton-adjuntar-imagen-perfil-borde-mobile" : "boton-adjuntar-imagen-perfil-mobile"}
                  >
                    <div className='container-image-perfil-user'>
                      <img className="imagen" src={mostrarImagenPerfil} />
                    </div>
                  </label>
                  <input
                    disabled={activarEdit}
                    name="imagenPerfilUser"
                    style={{ display: "none" }}
                    id="imagenPerfil"
                    type="file"
                    accept="image/*"
                    onChange={mostrarImagenUser}
                  />
                </div>
                {errorType===true && <p className="error">Tipo de archivo invalido</p>}
              </div>
              <div className='child-container-right-description'>
                <div className="flex-row-perfil">
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '60px' }}>
                    <input
                      defaultValue={dataUser != null ? dataUser.data.nombre : ''}
                      type="text"
                      className={activarEdit ? "input-style-grey" : "input-style-green"}
                      readOnly={activarEdit}
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Campo Requerido",
                        }, maxLength: {
                          value: 30,
                          message: "Máximo 30 caracteres"
                        }
                      })}
                    />
                    {errors.nombre?.required && <p className="error-perfil" >{errors.required?.message}</p>}
                    {errors.nombre?.message && <p className="error-perfil" >{errors.nombre?.message}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '60px' }}>
                    <input
                      defaultValue={dataUser != null ? dataUser.data.apellido : ''}
                      type="text"
                      className={activarEdit ? "input-style-grey" : "input-style-green"}
                      readOnly={activarEdit}
                      {...register("apellido", {
                        required: {
                          value: true,
                          message: "Campo Requerido",
                        }, maxLength: {
                          value: 60,
                          message: "Máximo 60 caracteres"
                        }
                      })}
                    />
                    {errors.apellido?.required && <p className="error-perfil" >{errors.required?.message}</p>}
                    {errors.apellido?.message && <p className="error-perfil" >{errors.apellido?.message}</p>}
                  </div>

                </div>
                <input
                  defaultValue={dataUser != null ? dataUser.data.email : ''}
                  type="text"
                  className="input-style-green input-disabled"
                  readOnly={true}
                  style={{ cursor: 'no-drop' }}
                  {...register("email")}
                />
                <textarea
                  type="text"
                  className={activarEdit ? "textarea-style-grey" : "textarea-style-green"}
                  readOnly={activarEdit}
                  defaultValue={dataUser != null ? dataUser.data.descripcion : ''}
                  {...register("descripcion", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    }, maxLength: {
                      value: 200,
                      message: "Máximo 200 caracteres"
                    }
                  })}
                />
                {errors.descripcion?.required && <p className="error-perfil" >{errors.required?.message}</p>}
                {errors.descripcion?.message && <p className="error-perfil" >{errors.descripcion?.message}</p>}
                {/* <button type="submit" className='button-save'>Guardar cambios</button> */}

                {activarEdit != true ?
                  <button type="submit" className='button-save'>Guardar cambios personales</button>
                  :
                  <input type="button" value="Editar perfil" className='button-save' onClick={() => setActivarEdit(!activarEdit)} />
                }
              </div>

            </form>
            <div className='container-right-description'></div>
          </div>
          {/* <div className='container-subtittle'>
          <h3>Estadísticas</h3>
          <div></div>
        </div> */}
        </div>
      </animated.div>

      {/* MODAL AFIRMATIVO */}
      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openPublicando} onClose={handleClose}>
        {nextStepModal == false ?
          <Modal.Body>
            <div className="container-text-modal">
              <p className="text-publicando"><b>Actualizando perfil</b></p>
              <span class="loader"></span>
            </div>
          </Modal.Body>
          :
          <>
            <Modal.Body>
              <div className="container-text-modal inline-text">
                <BsFillCheckCircleFill />
                <h4>Perfil actualizado correctamente</h4>
              </div>
            </Modal.Body>
            <Modal.Footer className="container-footer">
              <Button className="boton-cerrar" onClick={handleClose} >
                Cerrar
              </Button>
            </Modal.Footer>
          </>}
      </Modal>

    </>
  )
}
