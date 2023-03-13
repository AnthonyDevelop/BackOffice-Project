import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../NuevaEntrada/constants";
import { translate } from "../NuevaEntrada/translate";
import { setCreatePost } from "../../../../../../../actions/createPost";
import { Button, ButtonToolbar, ButtonGroup, Modal, IconButton } from 'rsuite';
import { Toggle } from "rsuite";
import { BsTwitter } from "react-icons/bs";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TfiTwitter } from "react-icons/tfi";
import { RiFacebookCircleFill, RiFacebookCircleLine } from "react-icons/ri";
import ModalMultimedia from "../NuevaEntrada/modalMultimedia/modalMultimedia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getEditarPost } from "../../../../../../../actions/editarPost";
import update from "react-addons-update";
import { useSpring, animated } from "react-spring";

export default function EditarEntrada() {
  const location = useLocation();
  var dataPost = {}
  // if (dataPost != null) {
  //   dataPost = location.state;
  // }

  const dataPostEditar = JSON.parse(localStorage.getItem("dataPostEdit"));
  const [checked2, setChecked2] = useState();


  const navigate = useNavigate();
  const [open, setOpen] = useState();
  const [imagenDestacadaId, setImagenDestacadaId] = useState([]);
  const [compartir, setCompartir] = useState({});

  const [imageUrl, setImageUrl] = useState();
  const [typeMedia, setTypeMedia] = useState();
  const [medioRuta, setMedioRuta] = useState("");
  const [openPublicando, setOpenPublicando] = useState(false);
  const [nextStepModal, setNextStepModal] = useState(false);
  const handleOpen = () => setOpenPublicando(true);
  const handleClose = () => {
    setOpenPublicando(false);
  }

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 450,
  });

  const [compartirFacebook, setCompartirFacebook] = useState(false);
  const [compartirTwitter, setCompartirTwitter] = useState(false);
  const [entradaPath, setEntradaPath] = useState("");
  const [errorFaltaCategoria, setErrorFaltaCategoria] = useState(false);
  const [blockState, setBlockState] = useState();
  const [mostrarErrorImagen, setMostrarErrorImagen] = useState();
  const [mostrarErrorCompartir, setMostrarErrorCompartir] = useState();
  const categorias = useSelector((state) => state.reducerCategorias.data);
  const reducerEditarPost = useSelector((state) => state.reducerEditarPost.data);

  const [tituloModal, setTituloModal] = useState();
  const [descripcionModal, setDescripcionModal] = useState();

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
  };

  useEffect(() => {
    if (dataPostEditar != null) {
      setDatos({
        titulo: dataPostEditar.titulo,
        copete: dataPostEditar.subtitulo,
        extracto: dataPostEditar.extractoRedes,
      });
      if (dataPostEditar.blocks[1] != null && dataPostEditar.blocks[1].type == "publicidad") {
        setBlockState(update(dataPostEditar.blocks, { $push: [dataPostEditar.blocks.splice(1, 1)] }))
      }
      if (dataPostEditar.pathPortada != null && dataPostEditar.pathPortada != false) {
        setImageUrl(dataPostEditar.pathPortada[1]);
        setImagenDestacadaId([dataPostEditar.idPortada, dataPostEditar.pathPortada]);
      }
      if(dataPostEditar.medios!=null){
        var arrayChecked2Default =[]
        for(let i=0; i<dataPostEditar.medios.length;i++){
          arrayChecked2Default.push(String(dataPostEditar.medios[i].id))
        }
        setChecked2(arrayChecked2Default);
      }
    }
  }, []);
  

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
    if (dataPostEditar != null && dataPostEditar.categorias != null) {
      for (let i = 0; i < dataPostEditar.categorias.length; i++) {
        if (typeof dataPostEditar.categorias[i] == 'object') {
          checked.push(dataPostEditar.categorias[i].nombre)
        } else {
          checked.push(dataPostEditar.categorias[i])
        }

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
    if (imageUrl != null && checked2.length >= 1 && errorFaltaCategoria === false && dataPostEditar!=null ) {
      const dataPost = {
        idPost: dataPostEditar.id,
        titulo: data.titulo,
        subtitulo: data.copete,
        categorias: data.categorias.length > 1 ? data.categorias : [data.categorias],
        medios: checked2,
        idPortada: imagenDestacadaId[0],
        pathPortada: imagenDestacadaId[1],
        idEstado: 2,
        extractoRedes: data.extracto,
        blocks: savedData.blocks,
        facebook: compartirFacebook,
        twitter: compartirTwitter,
      };
      setOpenPublicando(true);
      dispatch(getEditarPost(dataPost));
      setEntradaPath((medioRuta + data.titulo).replace(/\s+/g, '-'));
      localStorage.setItem("dataPostNota", JSON.stringify(dataPost));
      setTituloModal("Publicando")
      setDescripcionModal("Contenido cargado correctamente")
      if (imageUrl != null) {
        setMostrarErrorImagen(false);
      }
      if (checked2.length >= 1) {
        setMostrarErrorCompartir(false);
      }
    }
  }

  async function guardarBorrador() {
    const savedData = await instanceRef.current.save();
    const dataPostBorrador = {
      idPost: dataPostEditar.id,
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
    setTituloModal("Guardando")
    setDescripcionModal("Borrador guardado correctamente")
    setOpenPublicando(true);
    dispatch(getEditarPost(dataPostBorrador));
  }

  const onDataChange = (value) => {
    setImagenDestacadaId(value);
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
                dataPostEditar != null
                  ? dataPostEditar.categorias.find(function (ele) {
                    if (typeof ele == 'object') {
                      return (ele.nombre === listaCategorias[e].nombre)
                    } else {
                      return (
                        dataPostEditar.categorias.includes(
                          String(listaCategorias[e].nombre))
                      )
                    }
                  })
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
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  async function vistaPrevia() {
    const savedData = await instanceRef.current.save();
    const dataPost = {
      idPost: dataPostEditar.id,
      titulo: datos.titulo,
      subtitulo: datos.copete,
      categorias: checked,
      dateUpdate: {date: dataPostEditar.dateUpdate.date},
      pathPortada: imagenDestacadaId[1],
      idPortada: imagenDestacadaId[0],
      typeMedia: typeMedia,
      idEstado: 2,
      medios: checked2,
      extractoRedes: datos.extracto,
      blocks: savedData.blocks,
      redactor: dataPostEditar.redactor,
      ruta: "editarPost"
      // nombreAutor: 
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

  function descartarEntrada() {
    instanceRef.current.clear();
    // localStorage.removeItem("dataPost");
    localStorage.removeItem("dataPostEdit");
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

  console.log(checked2)

  function handleCompartirFacebook(e) {
    setCompartirFacebook(e)

  }
  function handleCompartirTwitter(e) {
    setCompartirTwitter(e)
  }

  useEffect(() => {

    if (reducerEditarPost != null && reducerEditarPost.message == "Publicacion actualizada correctamente") {
      setNextStepModal(true);
    }
    if (reducerEditarPost != null && reducerEditarPost.message == "Publicacion guardada como borrador") {
      setNextStepModal(true);
    }
  }, [reducerEditarPost]);

  window.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      console.log("enter desactivado")
    }
  }, false);

  return (
    <>
      <animated.div style={fadeOut}>
        <div className="container-nueva-entradas">
          <div className="container-tittle">
            <h2>Editar entrada</h2>
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
                    }
                  })}
                  onChange={onChangeDatos}
                />
                {errors.titulo?.required && <p className="error" >{errors.required?.message}</p>}
                {errors.titulo?.message && <p className="error" >{errors.titulo?.message}</p>}

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
                    size="lg"
                    checkedChildren={<BsTwitter />}
                    onChange={(value, e) => handleCompartirTwitter(value)}
                    unCheckedChildren={<TfiTwitter />}
                  />
                  <Toggle
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
                    // data={{
                    //   blocks: dataPostEditar!=null ? dataPostEditar.blocks : ""
                    // }}

                    data={{
                      blocks:
                        dataPostEditar != null
                          ? dataPostEditar.blocks
                          : "",
                    }}

                    i18n={translate}
                  />
                </div>
                <div className="botones-entrada-container">
                  <button className="button-grey-white" type="button" onClick={guardarBorrador}>Guardar borrador</button>
                  {/* <button className="button-grey-black" onClick={vistaPrevia}>
                    Vista previa
                  </button> */}
                  <a target="_blank" href="https://editor.fourcapital.com.ar/post-vista-previa" className="button-grey-black" onClick={vistaPrevia}>
                    Vista previa
                  </a>
                  <button type="button" className="button-red" onClick={descartarEntrada}>
                    Descartar cambios
                  </button>
                </div>
              </div>
              <div className="child-container-sidebar">
                <button
                  type="submit"
                  onClick={validarImagenDestacada}
                  className="button-form"
                >
                  Publicar
                </button>
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
                      <button onClick={() => setOpen(true)}>
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
                  defaultChecked={dataPostEditar != null && dataPostEditar.medios != null && dataPostEditar.medios[0] != null && dataPostEditar.medios[0].id === 1 ? true : false}
                  size="lg"
                  checkedChildren={"Editor Platense"}
                  unCheckedChildren={"Editor Platense"}
                />
                <Toggle
                  value={"2"}
                  onChange={(value, e) => handleCompartirMedios(e)}
                  size="lg"
                  defaultChecked={dataPostEditar != null && dataPostEditar.medios != null && dataPostEditar.medios[1] != null && dataPostEditar.medios[1].id == 2 ? true : false}
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
        typeMedia={"Imagen"}
        onChaneType={onChaneType}
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
