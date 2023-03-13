import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import { translate } from "./translate";
import { setCreatePost } from "../../../../../../../actions/createPost";
import { Button, ButtonToolbar, ButtonGroup, Modal, IconButton, Toggle } from 'rsuite';
import { BsTwitter } from "react-icons/bs";
import { TfiTwitter } from "react-icons/tfi";
import { RiFacebookCircleFill, RiFacebookCircleLine } from "react-icons/ri";
import ModalMultimedia from "./modalMultimedia/modalMultimedia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useSpring, animated } from "react-spring";
import { getEditarPost } from "../../../../../../../actions/editarPost";

import "../entradas.css";

export default function NuevaEntrada() {
  const location = useLocation();
  var dataPost = {}

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 250,
  });

  const dataPostEditar = JSON.parse(localStorage.getItem("dataPost"));
  const [checked2, setChecked2] = useState(["1"]);

  const [openPublicando, setOpenPublicando] = useState(false);
  const [nextStepModal, setNextStepModal] = useState(false);
  const [entradaPath, setEntradaPath] = useState("");
  const [medioRuta, setMedioRuta] = useState("");
  const handleOpen = () => setOpenPublicando(true);
  const handleClose = () => {
    descartarEntrada();
    setOpenPublicando(false);
  }

  const navigate = useNavigate();
  const [open, setOpen] = useState();
  const [imagenDestacadaId, setImagenDestacadaId] = useState([]);
  const [compartir, setCompartir] = useState({});

  const [imageUrl, setImageUrl] = useState();
  const [typeMedia, setTypeMedia] = useState();

  const [compartirFacebook, setCompartirFacebook] = useState(true);
  const [compartirTwitter, setCompartirTwitter] = useState(true);

  const [tituloModal, setTituloModal] = useState();
  const [descripcionModal, setDescripcionModal] = useState();

  const [mostrarErrorTituloNumero, setMostrarErrorTituloNumero] = useState();

  const [idPost, setIdPost] = useState();
  const [botonGuardarActivado, setBotonGuardarActivado] = useState(false);
  const [botonGuardando, setBotonGuardando] = useState();
  const [botonGuardarBorradorActivado, setBotonGuardarBorradorActivado] = useState(false);

  const [blockState, setBlockState] = useState();
  const [mostrarErrorImagen, setMostrarErrorImagen] = useState();
  const [errorFaltaCategoria, setErrorFaltaCategoria] = useState(null);
  const [mostrarErrorCompartir, setMostrarErrorCompartir] = useState();
  const categorias = useSelector((state) => state.reducerCategorias.data);
  const respuestaCrearPost = useSelector((state) => state.reducerRespuestaCreatePost.data);
  const reducerEditarPost = useSelector((state) => state.reducerEditarPost.data);
  

  const [realizoCambio, setRealizoCambio] = useState(null);
  const [creoElPost, setCreoElPost] = useState(false);

  const [datos, setDatos] = useState({
    titulo: "",
    copete: "",
    extracto: "",
  });
  const [checked, setChecked] = useState([]);
  const instanceRef = useRef(null);
  const dispatch = useDispatch();

  const handleCheck = (event) => {
    var updatedList = [...checked];

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setRealizoCambio(true)
  };

  useEffect(() => {
    if (checked.length == 1) {
      if (checked[0] == "DESTACADO_PPAL" || checked[0] == "DESTACADO_VIEW") {
        setErrorFaltaCategoria(true);
      }
      else {
        setErrorFaltaCategoria(false);
      }
    }
    if (checked.length == 2) {
      if ((checked[0] == "DESTACADO_PPAL" || checked[0] == "DESTACADO_VIEW") && (checked[1] == "DESTACADO_PPAL" || checked[1] == "DESTACADO_VIEW")) {
        setErrorFaltaCategoria(true);
      }
      else {
        setErrorFaltaCategoria(false);
      }
    }
    else if (checked.length > 1) {
      setErrorFaltaCategoria(false);
    }
  }, [checked]);

  useEffect(() => {
    if (dataPostEditar != null) {
      setDatos({
        titulo: dataPostEditar.titulo,
        copete: dataPostEditar.subtitulo,
        extracto: dataPostEditar.extractoRedes,
      });
      setChecked(dataPostEditar.categorias);
      setBlockState(dataPostEditar.blocks);
      if (dataPostEditar.pathPortada != null) {
        setImageUrl(dataPostEditar.pathPortada[1]);
        setImagenDestacadaId([dataPostEditar.idPortada, dataPostEditar.pathPortada]);
      }
    }
  }, []);

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

  function validarImagenDestacada() {
    if (imageUrl == null) {
      setMostrarErrorImagen(true);
    }
    if (checked2.length == 0) {
      setMostrarErrorCompartir(true);
    }
  }

  async function onSubmit(data) {
    const savedData = await instanceRef.current.save();
    if (checked2 == 2) {
      setMedioRuta("oestePlatense/")
    }
    if (data.titulo != "" && idPost != null && creoElPost === true) {
      const dataPost = {
        idPost: idPost != null && idPost,
        titulo: data.titulo,
        subtitulo: data.copete,
        categorias: data.categorias,setOpenPublicando,
        medios: checked2,
        idPortada: imagenDestacadaId[0],
        pathPortada: imagenDestacadaId[1],
        idEstado: 2,
        extractoRedes: data.extracto,
        blocks: savedData.blocks,
        facebook: compartirFacebook,
        twitter: compartirTwitter,
      };
      setBotonGuardarActivado(true)
      setEntradaPath((medioRuta + data.titulo).replace(/\s+/g, '-'));
      dispatch(getEditarPost(dataPost));
      // dispatch(setCreatePost(dataPost));
      localStorage.removeItem("dataPost");
      localStorage.setItem("dataPostNota", JSON.stringify(dataPost));
      setTituloModal("Publicando")
      setDescripcionModal("Contenido cargado correctamente")
      setOpenPublicando(true);
      if (imageUrl != null) {
        setMostrarErrorImagen(false);
      }
      if (checked2.length >= 1) {
        setMostrarErrorCompartir(false);
      }
    }
  }
  
  async function guardarBorrador() {
    if (idPost == null && creoElPost === false) {
      const savedData = await instanceRef.current.save();
      const dataPostBorrador = {
        titulo: datos.titulo,
        subtitulo: datos.copete,
        categorias: checked,
        medios: checked2,
        idPortada: imagenDestacadaId[0],
        pathPortada: imagenDestacadaId[1],
        idEstado: 4,
        typeMedia: typeMedia,
        extractoRedes: datos.extracto,
        blocks: savedData.blocks,
        facebook: false,
        twitter: false,
      };
      // setTituloModal("Guardando")
      // setDescripcionModal("Borrador guardado correctamente")
      // setOpenPublicando(true);
      dispatch(setCreatePost(dataPostBorrador));
    }
    if ( idPost != null && creoElPost === true) {
      console.log("estoy")
      const savedData = await instanceRef.current.save();
      const dataPostBorradorEditado = {
        idPost: idPost != null && idPost,
        titulo: datos.titulo,
        subtitulo: datos.copete,
        categorias: checked,
        medios: checked2,
        idPortada: imagenDestacadaId[0] != null ? imagenDestacadaId[0] : null,
        pathPortada: imagenDestacadaId[1],
        idEstado: 4,
        typeMedia: typeMedia,
        extractoRedes: datos.extracto,
        blocks: savedData.blocks,
        facebook: false,
        twitter: false,
      };

      dispatch(getEditarPost(dataPostBorradorEditado));      
      setBotonGuardando(true)
    }
    else{
      setMostrarErrorTituloNumero(false)
    }  
  }

  const onDataChange = (value) => {
    setImagenDestacadaId(value);
    setRealizoCambio(true)
    setTimeout(() => {
      setRealizoCambio(false)
    }, 2000);
  };

  const onChaneType = (value) => {
  };

  if (categorias != null && categorias.data != "") {
    const listaCategorias = categorias.data;
    var arrayListaCategorias = [];
    for (var e = 0; e < listaCategorias.length; e++) {
      arrayListaCategorias.push(
        <>
          <div className="container-checkbox">
            <input
              className="radio-special"
              defaultChecked={
                dataPostEditar != null && dataPostEditar.categorias != null
                  ? dataPostEditar.categorias.includes(
                    String(listaCategorias[e].nombre)
                  )
                  : false
              }
              {...register("categorias", { required: true })}
              onChange={handleCheck}
              type="checkbox"
              value={listaCategorias[e].nombre}
            />
            <label> {listaCategorias[e].nombre}</label>
          </div>
        </>
      );
    }
  }

  const onChangeDatos = (e) => {
    console.log(e.blocks)
    if(e.target!=null && e.target.value==null){
      setRealizoCambio(false)
    }
    if(e!=null){
      setRealizoCambio(true)
    }   
    if (e.blocks == null) {
      setDatos({
        ...datos,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name == "titulo") {
      setMostrarErrorTituloNumero(false)
    }

  };

  console.log(realizoCambio)

  useEffect(() => {
    if (creoElPost === false) {
      if ( realizoCambio === true) {
        setCreoElPost(true);
        setRealizoCambio(false);
        guardarBorrador();
      }
    }
    if (creoElPost === true) {
      if ( realizoCambio === true) {
          guardarBorrador();
          setTimeout(() => {
            setRealizoCambio(false)
          }, 2000);
      }
    }
  }, [realizoCambio]);


  const dataUser = useSelector((state) => state.reducerDataUser.data);
  const [infoRedactor, setInfoRedactor] = useState({});
  useEffect(() => {
    if (dataUser != null && dataUser.data != null) {
      setInfoRedactor({
        id: dataUser.data.id,
        nombre: dataUser.data.nombre + ' ' + dataUser.data.apellido,
        descripcion: dataUser.data.descripcion,
        path: dataUser.data.pathFotoPerfil,
        unMensaje: "Empieza el ritual, nadie dice nada pero, yo lo siento igual la desesperada gana de querer viajar con tan sólo una pitada a otra realidad que sea mejor..."
      })
    }
  }, [dataUser]);

  async function vistaPrevia() {
    const savedData = await instanceRef.current.save();
    const dataPost = {
      titulo: datos.titulo,
      subtitulo: datos.copete,
      categorias: checked,
      medios: checked2,
      pathPortada: imagenDestacadaId[1],
      idPortada: imagenDestacadaId[0],
      typeMedia: typeMedia,
      idEstado: 2,
      extractoRedes: datos.extracto,
      redactor: infoRedactor,
      blocks: savedData.blocks,
      ruta: "nuevoPost"
    };
    localStorage.setItem("dataPostNota", JSON.stringify(dataPost));
    //navigate("/post-vista-previa");
  }

  //LIMPIAR CHECKBOX
  function uncheckAll() {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach(function (checkElement) {
        checkElement.checked = false;
      });
  }

  window.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  }, false);

  function descartarEntrada() {
    instanceRef.current.clear();
    localStorage.removeItem("dataPost");
    localStorage.removeItem("dataPostNota");
    setDatos({
      titulo: "",
      copete: "",
      extracto: "",
    });
    reset()
    setChecked([]);
    uncheckAll();
    setImageUrl();
    setImagenDestacadaId([]);
    setIdPost(null);
    setCreoElPost(false);
    setRealizoCambio(null);
  }

  const handleCompartirMedios = (event) => {
    var updateArray = [...checked2];
    if (event.target.checked) {
      updateArray = [...checked2, event.target.value];
    } else {
      updateArray.splice(checked2.indexOf(event.target.value), 1);
    }
    setChecked2(updateArray);
  };

  function handleCompartirFacebook(e) {
    setCompartirFacebook(e)
  }

  function handleCompartirTwitter(e) {
    setCompartirTwitter(e)
  }

  useEffect(() => {
    if (reducerEditarPost != null && botonGuardarActivado==true && reducerEditarPost.message == "Publicacion actualizada correctamente") {
      setNextStepModal(true);
      setBotonGuardarActivado(false);
    }
    if (reducerEditarPost != null && botonGuardarActivado==false && reducerEditarPost.message == "Publicacion actualizada correctamente") {
      setBotonGuardando(false)
    }

    if (respuestaCrearPost != null && botonGuardarActivado==false && respuestaCrearPost.response == "Publicacion guardada como borrador") {
      setNextStepModal(true);
    }

    //Botones y respuestas cuando guardo borrador
    if(respuestaCrearPost != null && botonGuardarActivado==false && botonGuardarBorradorActivado==true && respuestaCrearPost.response == "Publicacion guardada como borrador"){
      setNextStepModal(true);
    }

    if(reducerEditarPost != null && botonGuardarActivado==false && botonGuardarBorradorActivado==true && reducerEditarPost.message == "Publicacion actualizada correctamente"){
      setNextStepModal(true);
    }
  }, [reducerEditarPost,respuestaCrearPost]);

  useEffect(() => {
    if(botonGuardarBorradorActivado==true){
      setTituloModal("Guardando")
      setDescripcionModal("Borrador guardado correctamente")
      setOpenPublicando(true);
    }

    }, [botonGuardarBorradorActivado]);

  useEffect(() => {
    if (respuestaCrearPost != null && respuestaCrearPost.posId != null) {
      setIdPost(respuestaCrearPost.posId)
    }
  }, [respuestaCrearPost]);

  return (
    <>
      <animated.div style={fadeOut}>
        <div className="container-nueva-entradas">
          <div className="container-tittle">
            <h2>Añadir nueva entrada</h2>
          </div>
          <form
            className="container-editor-texto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex-row">
              <div className="child-container-texto">
                <input
                  type="text"
                  name="titulo"
                  className="input-style-grey"
                  defaultValue={
                    dataPostEditar != null ? dataPostEditar.titulo : ""
                  }
                  placeholder="Escribe un titulo"
                  {...register("titulo", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    }, maxLength: {
                      value: 140,
                      message: "Máximo 140 caracteres permitidos"
                    },
                    // pattern: /^[A-Za-z][A-Za-z0-9]*$/
                  })}
                  onChange={onChangeDatos}
                />
                {errors.titulo?.required && <p className="error" >{errors.required?.message}</p>}
                {errors.titulo?.message && <p className="error" >{errors.titulo?.message}</p>}
                {mostrarErrorTituloNumero && <p className="error" >El título no debe comenzar con un número.</p>}

                <input
                  type="text"
                  name="copete"
                  className="input-style-grey"
                  defaultValue={
                    dataPostEditar != null ? dataPostEditar.subtitulo : ""
                  }
                  placeholder="Copete"
                  {...register("copete", { required: true })}
                  onChange={onChangeDatos}
                />
                {errors.copete && (
                  <p className="error" style={{ textAlign: "center" }}>
                    Campo Requerido
                  </p>
                )}
                <div className="extracto-redes-section">
                  <input
                    type="text"
                    name="extracto"
                    className="input-style-grey"
                    defaultValue={
                      dataPostEditar != null ? dataPostEditar.extractoRedes : ""
                    }
                    placeholder="Extracto redes"
                    {...register("extracto", {
                      maxLength: {
                        value: 280,
                        message: "Máximo 280 caracteres permitidos"
                      }
                    })}
                    onChange={onChangeDatos}
                  />
                  {errors.extracto?.message && <p className="error" >{errors.extracto?.message}</p>}

                  <Toggle
                    defaultChecked
                    size="lg"
                    checkedChildren={<BsTwitter />}
                    onChange={(value, e) => handleCompartirTwitter(value)}
                    unCheckedChildren={<TfiTwitter />}
                  />
                  <Toggle
                    defaultChecked
                    size="lg"
                    checkedChildren={<RiFacebookCircleFill />}
                    onChange={(value, e) => handleCompartirFacebook(value)}
                    unCheckedChildren={<RiFacebookCircleLine />}
                  />
                </div>

                <div className="text-editor-container">
                  <EditorJs
                    instanceRef={(instance) => (instanceRef.current = instance)}
                    tools={EDITOR_JS_TOOLS}
                    data={{
                      blocks:
                        dataPostEditar != null
                          ? dataPostEditar.blocks
                          : "",
                    }}
                    onChange={(e) => onChangeDatos(e)}
                    i18n={translate}
                  />
                </div>
                <div className="botones-entrada-container">
                  <button className="button-grey-white" type="button" onClick={()=>{guardarBorrador(); setBotonGuardarBorradorActivado(true)}}>Guardar borrador</button>
                  {/* <button className="button-grey-black" onClick={vistaPrevia}>
                    Vista previa
                  </button> */}
                  {/* <a target="_blank" href="https://editor.fourcapital.com.ar/post-vista-previa" className="button-grey-black" onClick={vistaPrevia}>
                    Vista previa
                  </a> */}
                  <a target="_blank" href="https://editor.fourcapital.com.ar/post-vista-previa" className="button-grey-black" onClick={vistaPrevia}>
                    Vista previa
                  </a>
                  <button
                    type="button" className="button-red" onClick={descartarEntrada}>
                    Descartar cambios
                  </button>
                </div>
              </div>
              <div className="child-container-sidebar">
                {botonGuardando === true ?
                            <button
                            type="button"
                            className="button-form"
                          >
                            Guardando
                          </button>
                            :    
                      <button
                      type="submit"
                      onClick={validarImagenDestacada}
                      className="button-form"
                      >
                      Publicar
                      </button>

              }

                
                <div className="container-categorias">
                  <div className="tittle-categoria">
                    <p>Categoría</p>
                  </div>
                  <div className="lista-categorias">{arrayListaCategorias}</div>
                </div>
                {errors.categorias && (
                  <p className="error" style={{ textAlign: "center" }}>
                    Campo Requerido
                  </p>
                )}
                {errorFaltaCategoria && (
                  <p className="error" style={{ textAlign: "center" }}>
                    falta agregar una categoria
                  </p>
                )}
                <div className="imagen-destacada-box">
                  {imagenDestacadaId.length > 0 ? (
                    <div class="container">
                      <img class="image" src={imagenDestacadaId[1]} />
                      <div class="overlay" onClick={() => setOpen(true)}>
                        <div class="text">Cambiar imagen portada</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>Imagen Destacada</p>
                      <hr />
                      <button type="button" onClick={() => setOpen(true)}>
                        Establecer la imagen destacada
                      </button>
                    </>
                  )}
                </div>
                {mostrarErrorImagen == true && (
                  <p className="error" style={{ textAlign: "center" }}>
                    Campo Requerido
                  </p>
                )}
                <Toggle
                  value={"1"}
                  onChange={(value, e) => handleCompartirMedios(e)}
                  defaultChecked={dataPostEditar != null && dataPostEditar.medios != null && dataPostEditar.medios[0] != null && dataPostEditar.medios[0] == 1 ? true : dataPostEditar != null && dataPostEditar.medios != null && dataPostEditar.medios[0] != null && dataPostEditar.medios[0] == 2 ? false : true}
                  size="lg"
                  checkedChildren={"Editor Platense"}
                  unCheckedChildren={"Editor Platense"}
                />
                <Toggle
                  value={"2"}
                  onChange={(value, e) => handleCompartirMedios(e)}
                  size="lg"
                  defaultChecked={dataPostEditar != null && dataPostEditar.medios != null && dataPostEditar.medios[0] != null && dataPostEditar.medios[0] == 2 ? true : dataPostEditar != null && dataPostEditar.medios != null && dataPostEditar.medios[1] != null && dataPostEditar.medios[1] == 2 ? true : false}
                  checkedChildren={"Oeste Platense"}
                  unCheckedChildren={"Oeste Platense"}
                />
                {mostrarErrorCompartir == true && (
                  <p className="error" style={{ textAlign: "center" }}>
                    Campo Requerido
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </animated.div>

      <ModalMultimedia
        open={open}
        setOpen={setOpen}
        setImageUrl={setImageUrl}
        onDataChange={onDataChange}
        setTypeMedia={setTypeMedia}
        typeMedia={"Image"}
        onChaneType={onChaneType}
        data-aos="fade-in"
        data-aos-duration="500"
      />

      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openPublicando} onClose={handleClose}>
        {nextStepModal == false ?
          <Modal.Body>
            <div className="container-text-modal container-text-modal-loading">
              <p className="text-publicando">{tituloModal}</p>
              <span class="loader"></span>
            </div>
          </Modal.Body>
          :
          <>
            <Modal.Body>
              <div className="container-text-modal inline-text">
                <BsFillCheckCircleFill />
                <h4>{descripcionModal}</h4>
              </div>
            </Modal.Body>
            <Modal.Footer className="container-footer">
              <Button className="boton-cerrar" onClick={handleClose} >
                Cerrar
              </Button>
              <Link to={"/" + entradaPath} className="boton-ir">
                Ir al post
              </Link>
            </Modal.Footer>
          </>}
      </Modal>



    </>
  );
}
