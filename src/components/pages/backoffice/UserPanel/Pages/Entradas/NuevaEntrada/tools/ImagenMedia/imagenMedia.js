import React, { useState, useEffect } from "react";
import { getListMultimedia } from "../../../../../../../../../actions/listMultimedia";
import { useSelector, useDispatch } from "react-redux";
import Plyr from 'plyr';
import ModalMultimedia from "../../modalMultimedia/modalMultimedia";

export default function ImagenMedia(props) {
  const onDataChange = props.onDataChange;
  const onChaneType = props.onChaneType;
  const data = props.datos;
  const dataPost = JSON.parse(localStorage.getItem("dataPost"));

  const [open, setOpen] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [typeMedia, setTypeMedia] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(false);
  }, []);



  useEffect(() => {
    const dataMultimedia = {
      nombre: "",
      type:"",
      page: 1,
    };
    dispatch(getListMultimedia(dataMultimedia));
  }, []);

  // const DataImagenMedia = () => {
  //   if (imageUrl != null && typeMedia != null) {
  //     if (
  //       typeMedia === "image/png" ||
  //       typeMedia === "image/jpg" ||
  //       typeMedia === "image/jpeg"
  //     ) {
  //       <img src={imageUrl} />;
  //     } else {
  //       <video controls>
  //         <source src={imageUrl} />
  //       </video>;
  //     }
  //   } else {
  //     <div class="cdx-button" onClick={() => setOpen(true)}>
  //       <svg
  //         width="20"
  //         height="20"
  //         viewBox="0 0 20 20"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
  //       </svg>
  //       Seleccionar Imagenasdasdasdasd
  //     </div>;
  //   }
  //   return DataImagenMedia;
  // };

  const player = new Plyr('#video-player-post',{
    i18n: {
      speed: 'Velocidad'
    },
  });

  return (
    <>
      {data != null && data[1] != null && data[2] == "img" ? (
        <img src={data[1]} />
      ) : data != null && data[1] != null && data[2] == "video" ? (
           <video id="video-player-post" class="plyr">
             <source src={data[1]}/>
           </video>
      ) : imageUrl != null && typeMedia != null ? (
        <>
          {typeMedia === "imagen" ? (
            <img src={imageUrl} />
          ) : (

              <video id="video-player-post" class="plyr">
                 <source src={imageUrl} />
             </video>
          )}
        </>
      ) : (
        <div class="cdx-button" onClick={() => setOpen(true)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
          </svg>
          Seleccionar Multimedia
        </div>
      )}

      <ModalMultimedia
        open={open}
        setOpen={setOpen}
        onDataChange={onDataChange}
        setTypeMedia={setTypeMedia}
        typeMedia={""}
        setImageUrl={setImageUrl}
        onChaneType={onChaneType}
      />
    </>
  );
}
