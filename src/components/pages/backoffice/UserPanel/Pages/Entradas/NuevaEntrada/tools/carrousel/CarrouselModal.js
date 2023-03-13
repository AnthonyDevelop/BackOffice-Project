import React, { useEffect, useState } from "react";
import { Modal, Button, ButtonToolbar, Placeholder, Pagination } from "rsuite";
import { useSelector, useDispatch } from "react-redux";
import { Uploader } from "rsuite";
import { CgSoftwareUpload } from 'react-icons/cg';
import { getListMultimedia } from "../../../../../../../../../actions/listMultimedia";
import axios from "axios";

export default function CarrouselModal(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const onDataChange = props.onDataChange;
  const setImageUrl = props.setImageUrl;
  const imageUrl = props.imageUrl;
  const setTypeMedia = props.setTypeMedia;
  const [checked, setChecked] = useState([]);
  const [arrayIdImages, setArrayIdImages] = useState([]);

  const [errorMaxFile, setErrorMaxFile] = useState();
  const [activePage, setActivePage] = useState(1);


  var updateListUrl = [];
  var updatedList = [];
  var listIdImages = [];

  const handleCheck = (event) => {
    console.log(event.target.value)
    console.log(event.target.checked)
    updateListUrl = [...imageUrl]
    updatedList = [...checked];
    listIdImages = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      updateListUrl = [...imageUrl, event.target.src];
      listIdImages = [...arrayIdImages, event.target.value];
      console.log("hoalsdasdas")
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
      updateListUrl.splice(imageUrl.indexOf(event.target.src), 1);
      listIdImages.splice(arrayIdImages.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setImageUrl(updateListUrl);
    setArrayIdImages(listIdImages);
    if (onDataChange) {
      onDataChange([checked, imageUrl]);
    }

  };

  const dispatch = useDispatch();
  const listMultimedia = useSelector(
    (state) => state.reducerListMultimedia.data
  );

  function actualizarVistaMultimedia() {
    const dataMultimedia = {
      nombre: "",
      type: "",
      page: activePage,
    };
    dispatch(getListMultimedia(dataMultimedia));
  }

  useEffect(() => {
    if (activePage != 1) {
      actualizarVistaMultimedia()
    }
  }, [activePage])

  //LIMPIAR CHECKBOX
  function uncheckAll() {
    document.querySelectorAll('input[type=checkbox]').forEach(function (checkElement) {
      checkElement.checked = false;
    });
  }

  console.log(imageUrl)

  function handleCloseModal() {    
      uncheckAll();
    setArrayIdImages([]);
    setChecked([]);
    setOpen(false);
    setActivePage(1);    
    setImageUrl(updateListUrl);
  }


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
    <Modal
      size="full"
      backdrop="static"
      open={open}
      onClose={handleCloseModal}
    >
      <Modal.Header>
        <Modal.Title className="titulo-modal-biblioteca"><h4>Biblioteca de medios</h4></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="medios-container">
          <Uploader
            style={{ width: "100%" }}
            className="uploader-medios"
            accept="image/png, image/gif, image/jpeg, image/jpg, video/mp4, image/webp"
            multiple="true"
            listType="picture-text"
            method="POST"
            headers={{
              Authorization: `Bearer ` + localStorage.getItem("token")
            }}
            action="https://editor.fourcapital.com.ar/server/public/api/post/uploadFile"
            shouldUpload={(file) => {
              if (file.blobFile.size > 314572800) {
                setErrorMaxFile(true);
                return true;
              }
            }}
            renderFileInfo={(file, fileElement) => {
              <>
                <span>File Name: {file.name}</span>
                <p>File URL: {file.url}</p>
              </>;
            }}
            name="file"
            draggable
            onSuccess={handleUploadSuccess}
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
          <ButtonToolbar className="section-imagenes-biblioteca">
            {listMultimedia != null &&
              listMultimedia.data.map((item, key) => {
                return (
                  <div className="checkbox-image-box">
                    <input
                      type="checkbox"
                      className="check-button"
                      checked={arrayIdImages.includes(String(item.id)) ? true : false}
                      value={item.id}
                      src={item.path}
                      onChange={handleCheck}
                      name="check"
                    />
                    <div key={key} className={"box-imagen-biblioteca"} >
                      {item.type != "video/mp4" ? (
                        <img accessKey={item.id} src={item.pathPortada} />
                      ) : (
                        <img
                          accessKey={item.id}
                          src={
                            "https://res.cloudinary.com/grupo-delsud/image/upload/v1669910126/eleditorNoticias/video-01_xyqckn.svg"
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </ButtonToolbar>
          <Pagination
            prev
            next
            size="md"
            total={listMultimedia != null ? listMultimedia.totalRegisters : ""}
            limit={30}
            activePage={activePage}
            onChangePage={setActivePage}
          />

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="boton-insertar-medio" onClick={() => setOpen(false)} appearance="primary">
          Insertar
        </Button>
        <Button className="boton-cancelar" onClick={handleCloseModal} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
