import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Uploader, SelectPicker, Input, InputGroup, Pagination, Modal, Button } from "rsuite";
import ModalVerMedia from "./ModalVerMedia/ModalVerMedia";
import { getListMultimedia } from "../../../../../../actions/listMultimedia";
import { CgSoftwareUpload } from 'react-icons/cg';
import SearchIcon from '@rsuite/icons/Search';
import { useSpring, animated } from "react-spring";


import "./medios.css";
import ModalMediaCargada from "./ModalVerMedia/ModalMediaCargada";
import { set } from "react-hook-form";
import { CLOSING } from "ws";
import { RiDeleteBin6Line } from 'react-icons/ri';
import ModalEliminarMedia from "./ModalVerMedia/ModalEliminarMedia";
import { setEliminarMultimedia } from "../../../../../../actions/eliminarMultimedia";
import { IoCloseCircleSharp } from "react-icons/io5";
import axios from "axios";

export default function Medios(props) {
  const dispatch = useDispatch();
  const listMultimedia = useSelector(
    (state) => state.reducerListMultimedia.data
  );
  const actualizacionMultimedia = useSelector(
    (state) => state.reducerEliminarMultimedia
  );
  // console.log(actualizacionMultimedia)

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 250,
  });

  const locale = {
    noResultsText: "No existen resultados",
    placeholder: "",
    searchPlaceholder: "Buscar...",
    checkAll: "",
  };



  function actualizarVistaMultimedia() {
    const dataMultimedia = {
      nombre: busquedaMedio.dataBase,
      type: busquedaVideo,
      page: activePage,
    }
    dispatch(getListMultimedia(dataMultimedia));
    setOpenExitoso(true)
  }

  const [errorMaxFile, setErrorMaxFile] = useState();
  const [open, setOpen] = useState();
  const handleClose = () => setOpenEliminarMedia(false);
  const handleShow = () => setOpenEliminarMedia(true);
  const [openEliminarMedia, setOpenEliminarMedia] = useState(false);
  const [data, setData] = useState();
  const [activePage, setActivePage] = useState(1);
  const [checkActivo, setCheckActivo] = useState(false)
  const [thumbnails, setThumbnails] = useState([]);
  
  const [portada, setPortada] = useState()

  useEffect(() => {
    actualizarVistaMultimedia()
  }, [activePage])

  const [openExitoso, setOpenExitoso] = useState(false);
  const [busquedaMedio, setBusquedaMedio] = useState({
    dataBase: '',
  });

  const [busquedaVideo, setBusquedaVideo] = useState("");

  useEffect(() => {
    const dataMultimedia = {
      nombre: busquedaMedio.dataBase,
      type: busquedaVideo,
      page: activePage,
    }
    dispatch(getListMultimedia(dataMultimedia));
  }, [busquedaMedio, busquedaVideo, actualizacionMultimedia]);

  const handleChangeBuscadorMedio = (e) => {
    setBusquedaMedio({
      ...busquedaMedio,
      [e.target.name]: e.target.value,
    });
  }

  const dataType = ['Imagen', 'Video'].map(
    item => ({ label: item, value: item })
  );

  const handleChangeType = (e) => {
    setBusquedaVideo(e);
  }

  const [checked, setChecked] = useState([]);


  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  function abrirModalEliminar() {
    if (handleCheck.length > 0) {
      setOpenEliminarMedia(true);
    }
  }
  // Return classes based on whether item is checked
  var isChecked = (item) => (checked.includes(item) ? "activar" : "");


  function eliminarVideoUsuario() {
    dispatch(setEliminarMultimedia(checked));
    handleClose();
    setChecked([]);
  }

  //LIMPIAR CHECKBOX
  function uncheckAll() {
    document.querySelectorAll('input[type=checkbox]').forEach(function (checkElement) {
      checkElement.checked = false;
    });
  }


  const [openErrorMultimedia, setOpenErrorMultimedia] = useState(false);
  const handleCloseMultimedia = () => setOpenErrorMultimedia(false);
  useEffect(() => {
    if (actualizacionMultimedia != null && actualizacionMultimedia.data != null && actualizacionMultimedia.data.message === "File borrado correctamente") {
      uncheckAll();
    }
    if (actualizacionMultimedia && actualizacionMultimedia.data) {
      if (actualizacionMultimedia.data.message === "El archivo esta siendo usado"
        || actualizacionMultimedia.data.message === "El archivo esta siendo usado como foto de perfil"
        || actualizacionMultimedia.data.message === "El archivo esta siendo usado como publicidad"
      ) {
        setOpenErrorMultimedia(true);
        setChecked([]);
        uncheckAll();
      }
    }

  }, [actualizacionMultimedia]);
  // console.log(actualizacionMultimedia.data.message)
  // console.log(openErrorMultimedia)


  let uploadCounter = 0;

  async function createPreview(file, fileType) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.blobFile);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const canvasSize = 120;
          canvas.width = canvasSize;
          canvas.height = canvasSize;
  
          // Calcula la relación de aspecto de la imagen original
          const imgRatio = img.width / img.height;
  
          // Calcula la relación de aspecto del canvas
          const canvasRatio = canvas.width / canvas.height;
  
          // Calcula la escala y posición del recorte
          let scale, dx, dy;
          if (imgRatio > canvasRatio) {
            // La imagen es más ancha que el canvas
            scale = canvas.height / img.height;
            dx = -(img.width * scale - canvas.width) / 2;
            dy = 0;
          } else {
            // La imagen es más alta que el canvas
            scale = canvas.width / img.width;
            dx = 0;
            dy = -(img.height * scale - canvas.height) / 2;
          }
  
          // Dibuja la imagen en el canvas con el recorte y escala
          ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
  
          canvas.toBlob((blob) => {
            let extension;
            if (fileType === 'image/png') {
              extension = 'png';
            } else if (fileType === 'image/jpeg') {
              extension = 'jpeg';
            } else if (fileType === 'image/jpg') {
              extension = 'jpg';
            } else if (fileType === 'image/webp') {
              extension = 'webp';
            } else {
              extension = '';
            }
  
            resolve({ binary: blob, name: `${file.name}` });
          }, fileType, 0.7);
        };
      };
    });
  }


  async function handleSubmit(preview) {
    const formData = new FormData();
    formData.append(`portada`, new Blob([preview.binary]), preview.name);
    await axios.post('https://editor.fourcapital.com.ar/server/public/api/post/uploadFile', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    uploadCounter--;
    checkUploadComplete();
  }

  function checkUploadComplete() {
    if (uploadCounter === 0) {
      // Se han subido todas las imágenes, realiza la acción necesaria
      actualizarVistaMultimedia()
      console.log("SE TERMINO DE CARGAR TODO")
    }
  }

  const handleUploadSuccess = async (response, file) => {
    const fileType = file.blobFile.type;
    if(fileType=="video/mp4"){
      actualizarVistaMultimedia();
    }
    const preview = await createPreview(file, fileType);    
    uploadCounter++;
    await handleSubmit(preview); 

  };

  return (

    <animated.div style={fadeOut}>
      <div className="medios-container">
        <div class="container-tittle"><h2>Biblioteca de medios</h2></div>
        <Uploader
          className="uploader-medios"
          accept="image/png, image/gif, image/jpeg, image/jpg, video/mp4, image/webp"
          multiple="true"
          listType="picture-text"
          method="POST"
          headers={{
            Authorization: `Bearer ` + localStorage.getItem("token")
          }}
          action="https://editor.fourcapital.com.ar/server/public/api/post/uploadFile"
          onSuccess={handleUploadSuccess}
          shouldUpload={(file) => {
            if (file.blobFile.size > 314572800) {
              setErrorMaxFile(true);
              return true;
            }

          }}         
          name="file"
          draggable
        >
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CgSoftwareUpload className="icono-subir-archivo" />
            <div>
              <p><b>Cargá o arrastrá los archivos para subirlos</b></p>
              <p>Tamaño máximo: 300Mb.</p>
            </div>
            <button>Seleccionar archivos</button>

          </div>
        </Uploader>
        {errorMaxFile && <p className="error">El archivo supera el tamaño máximo permitido</p>}
        <div className="medios-seccion-filtros">
          <div>
            <SelectPicker className="filtros-medios"
              data={dataType}
              searchable={false}
              onChange={(e) => handleChangeType(e)}
              onClean={(value, e) => handleChangeType('')}
              placeholder={"Todos los medios"}
              locale={locale}
              name="type"
            />
            {checked != '' ?
              <RiDeleteBin6Line color="red" fontSize={25} onClick={() => { abrirModalEliminar() }} />
              :
              ''
            }
          </div>
          <div>
            <InputGroup inside className="search-medios" onChange={handleChangeBuscadorMedio}>
              <Input value={busquedaMedio.dataBase} name="dataBase" placeholder={"Buscar..."} />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>

        </div>
        <div className="section-imagenes-biblioteca">
          {listMultimedia != null &&
            listMultimedia.data.map((item, key) => {
              return (
                <div key={key} className={`box-imagen-biblioteca-2 ${isChecked(
                  String(item.id)
                )}`} >
                  {item.type == "image/png" || item.type == "image/gif" || item.type == "image/jpeg" || item.type == "image/jpg" || item.type == "image/webp" ?
                    <img src={item.pathPortada} />
                    :
                    <div className={`box-video-preview ${isChecked(
                      String(item.id)
                    )}`}>
                      <img src="https://res.cloudinary.com/grupo-delsud/image/upload/v1669910126/eleditorNoticias/video-01_xyqckn.svg" />
                      <p className="titulo-video-box-preview">{item.nombre.substring(0, 20) + '...'}</p>
                    </div>
                  }
                  <div className="textBox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={String(item.id)}
                      name="check"
                      onChange={handleCheck}
                    />
                    <button style={{ color: 'white', background: '#48ac33', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '5px 11px', borderRadius: '10px', border: '1px solid white' }} onClick={() => { setOpen(true); setData(item) }}>VER</button>
                  </div>
                </div>
              );
            })}
          <div style={{ width: '100%' }}>
            <p className="font-elementos-medio">Tienes {listMultimedia != null && listMultimedia.totalRegisters} elementos almacenados</p>
          </div>
        </div>
        <Pagination
          prev
          next
          size="md"
          total={listMultimedia != null ? listMultimedia.totalRegisters : ""}
          // limit={30}
          activePage={activePage}
          onChangePage={setActivePage}
        />
        <ModalVerMedia open={open} setOpen={setOpen} data={data} />
        <ModalMediaCargada open={openExitoso} setOpen={setOpenExitoso} data={data} />
      </div>
      <ModalEliminarMedia
        data={checked}
        setChecked={setChecked}
        openEliminarMedia={openEliminarMedia}
        setOpenEliminarMedia={setOpenEliminarMedia}
        handleClose={handleClose}
        eliminarVideoUsuario={eliminarVideoUsuario}
      />
      <Modal className="container-modal-aviso modal-error" backdrop={'static'} keyboard={false} open={openErrorMultimedia} onClose={handleCloseMultimedia}>
        <Modal.Body>
          <div className="container-text-modal inline-text">
            <IoCloseCircleSharp />
            <h4>Este archivo multimedia esta siendo utilizado</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button className="boton-cerrar" onClick={handleCloseMultimedia} >
            Cerrar
          </Button>
        </Modal.Footer>

      </Modal>
    </animated.div>
  );
}
