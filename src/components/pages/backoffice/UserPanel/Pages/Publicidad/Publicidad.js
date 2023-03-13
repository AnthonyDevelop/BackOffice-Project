import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Button, Modal} from 'rsuite';

import { setCargarPublicidad } from "../../../../../../actions/cargarPublicidad";

import './publicidad.css';
import ModalVerMedia from "../Medios/ModalVerMedia/ModalVerMedia";
import ModalMultimedia from "../Entradas/NuevaEntrada/modalMultimedia/modalMultimedia";
import { getListPublicidades } from "../../../../../../actions/listPublicidades";
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function Publicidad() {
  const dispatch = useDispatch();
  const publiData = useSelector((state) => state.reducerListPublicidades.data);
  const resUpdatePubli = useSelector((state) => state.reducerCargarPublicidad.data);


  const [modalMultimedia, setModalMultimedia] = useState(false);
  const [imagenUrl, setImageUrl] = useState(false);
  const [typeMedia, setTypeMedia] = useState(false);

  const [nextStepModal, setNextStepModal] = useState(false);  
  const [openPublicando, setOpenPublicando] = useState(false);
  const handleOpen = () => setOpenPublicando(true);
  const handleClose = () => {
    setOpenPublicando(false);
  }

  const [botonPubliUnoActivoDesk,setBotonPubliUnoActivoDesk] = useState();
  const [botonPubliUnoActivoMob,setBotonPubliUnoActivoMob] = useState();
  const [botonPubliDosActivoDesk,setBotonPubliDosActivoDesk] = useState();
  const [botonPubliDosActivoMob,setBotonPubliDosActivoMob] = useState();
  const [botonPubliTresActivoDesk,setBotonPubliTresActivoDesk] = useState();
  const [botonPubliTresActivoMob,setBotonPubliTresActivoMob] = useState();
  const [botonPubliCuatroActivoDesk,setBotonPubliCuatroActivoDesk] = useState();
  const [botonPubliCuatroActivoMob,setBotonPubliCuatroActivoMob] = useState();
  const [botonPubliCincoActivoDesk,setBotonPubliCincoActivoDesk] = useState();
  const [botonPubliCincoActivoMob,setBotonPubliCincoActivoMob] = useState();
  const [botonPubliSeisActivoDesk,setBotonPubliSeisActivoDesk] = useState();
  const [botonPubliSeisActivoMob,setBotonPubliSeisActivoMob] = useState();
  const [botonPubliSieteActivoDesk,setBotonPubliSieteActivoDesk] = useState();
  const [botonPubliSieteActivoMob,setBotonPubliSieteActivoMob] = useState();
  const [botonSubir,setBotonSubir] = useState();

  const [vistaPubliUnoDesk, setVistaPubliUnoDesk] = useState();
  const [vistaPubliUnoMob, setVistaPubliUnoMob] = useState();
  const [vistaPubliDosDesk, setVistaPubliDosDesk] = useState();
  const [vistaPubliDosMob, setVistaPubliDosMob] = useState();
  const [vistaPubliTresDesk, setVistaPubliTresDesk] = useState();
  const [vistaPubliTresMob, setVistaPubliTresMob] = useState();
  const [vistaPubliCuatroDesk, setVistaPubliCuatroDesk] = useState();
  const [vistaPubliCuatroMob, setVistaPubliCuatroMob] = useState();
  const [vistaPubliCincoDesk, setVistaPubliCincoDesk] = useState();
  const [vistaPubliCincoMob, setVistaPubliCincoMob] = useState();
  const [vistaPubliSeisDesk, setVistaPubliSeisDesk] = useState();
  const [vistaPubliSeisMob, setVistaPubliSeisMob] = useState();
  const [vistaPubliSieteDesk, setVistaPubliSieteDesk] = useState();
  const [vistaPubliSieteMob, setVistaPubliSieteMob] = useState();

  const [publiUnoIdDesk, setPubliUnoIdDesk] = useState();
  const [publiUnoIdMob, setPubliUnoIdMob] = useState();
  const [publiDosIdDesk, setPubliDosIdDesk] = useState();
  const [publiDosIdMob, setPubliDosIdMob] = useState();
  const [publiTresIdDesk, setPubliTresIdDesk] = useState();
  const [publiTresIdMob, setPubliTresIdMob] = useState();
  const [publiCuatroIdDesk, setPubliCuatroIdDesk] = useState();
  const [publiCuatroIdMob, setPubliCuatroIdMob] = useState();
  const [publiCincoIdDesk, setPubliCincoIdDesk] = useState();
  const [publiCincoIdMob, setPubliCincoIdMob] = useState();
  const [publiSeisIdDesk, setPubliSeisIdDesk] = useState();
  const [publiSeisIdMob, setPubliSeisIdMob] = useState();
  const [publiSieteIdDesk, setPubliSieteIdDesk] = useState();
  const [publiSieteIdMob, setPubliSieteIdMob] = useState();

  const [typePubliUnoDesk, setTypePubliUnoDesk] = useState();
  const [typePubliUnoMob, setTypePubliUnoMob] = useState();
  const [typePubliDosDesk, setTypePubliDosDesk] = useState();
  const [typePubliDosMob, setTypePubliDosMob] = useState();
  const [typePubliTresDesk, setTypePubliTresDesk] = useState();
  const [typePubliTresMob, setTypePubliTresMob] = useState();
  const [typePubliCuatroDesk, setTypePubliCuatroDesk] = useState();
  const [typePubliCuatroMob, setTypePubliCuatroMob] = useState();
  const [typePubliCincoDesk, setTypePubliCincoDesk] = useState();
  const [typePubliCincoMob, setTypePubliCincoMob] = useState();
  const [typePubliSeisDesk, setTypePubliSeisDesk] = useState();
  const [typePubliSeisMob, setTypePubliSeisMob] = useState();
  const [typePubliSieteDesk, setTypePubliSieteDesk] = useState();
  const [typePubliSieteMob, setTypePubliSieteMob] = useState();

  const [urlPublicidades, setUrlPublicidades]= useState({
    urlPubliUnoDesk:"",
    urlPubliUnoMob:"",
    urlPubliDosDesk:"",
    urlPubliDosMob:"",
    urlPubliTresDesk:"",
    urlPubliTresMob:"",
    urlPubliCuatroDesk:"",
    urlPubliCuatroMob:"",
    urlPubliCincoDesk:"",
    urlPubliCincoMob:"",
    urlPubliSeisDesk:"",
    urlPubliSeisMob:"",
    publiSieteDesk:"",
    publiSieteMob:"",
  });


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

    const arrayPublicidad=[]
    arrayPublicidad.push(
      {
        id:publiUnoIdDesk,
        url:urlPublicidades.urlPubliUnoDesk
      },
      {
        id:publiUnoIdMob,
        url:urlPublicidades.urlPubliUnoMob
      },
      {
        id:publiDosIdDesk,
        url:urlPublicidades.urlPubliDosDesk
      },
      {
        id:publiDosIdMob,
        url:urlPublicidades.urlPubliDosMob
      },
      {
        id:publiTresIdDesk,
        url:urlPublicidades.urlPubliTresDesk
      },
      {
        id:publiTresIdMob,
        url:urlPublicidades.urlPubliTresMob
      },
      {
        id:publiCuatroIdDesk,
        url:urlPublicidades.urlPubliCuatroDesk
      },
      {
        id:publiCuatroIdMob,
        url:urlPublicidades.urlPubliCuatroMob
      },
      {
        id:publiCincoIdDesk,
        url:urlPublicidades.urlPubliCincoDesk
      },
      {
        id:publiCincoIdMob,
        url:urlPublicidades.urlPubliCincoMob
      },
      {
        id:publiSeisIdDesk,
        url:urlPublicidades.urlPubliSeisDesk
      },
      {
        id:publiSeisIdMob,
        url:urlPublicidades.urlPubliSeisMob
      },
      {
        id:publiSieteIdDesk,
        url:urlPublicidades.urlPubliSieteDesk
      },
      {
        id:publiSieteIdMob,
        url:urlPublicidades.urlPubliSieteMob
      })
    dispatch(setCargarPublicidad(arrayPublicidad))
    setOpenPublicando(true);
    const formData = new FormData();
    setBotonSubir(false)
    // formData.append("imagen1", publiUno);
    // formData.append("imagen2", publiDos);
    // formData.append("image3", imgData);
    // formData.append("image4", imgData);
    // dispatch(setSubirPublicidad(formData));
  };


  const onDataChange = (imagen) => {
    setBotonSubir(true)
    if(botonPubliUnoActivoDesk==true){
      setPubliUnoIdDesk(imagen[0])
      setVistaPubliUnoDesk(imagen[1]);      
      setTypePubliUnoDesk(imagen[2]);
    }
    if(botonPubliUnoActivoMob==true){
      setPubliUnoIdMob(imagen[0])
      setVistaPubliUnoMob(imagen[1]);      
      setTypePubliUnoMob(imagen[2]);
    }
    if(botonPubliDosActivoDesk==true){
      setPubliDosIdDesk(imagen[0])
      setVistaPubliDosDesk(imagen[1]);
      setTypePubliDosDesk(imagen[2]);
    }
    if(botonPubliDosActivoMob==true){
      setPubliDosIdMob(imagen[0])
      setVistaPubliDosMob(imagen[1]);
      setTypePubliDosMob(imagen[2]);
    }
    if(botonPubliTresActivoDesk==true){
      setPubliTresIdDesk(imagen[0])
      setVistaPubliTresDesk(imagen[1]);
      setTypePubliTresDesk(imagen[2]);
    }
    if(botonPubliTresActivoMob==true){
      setPubliTresIdMob(imagen[0])
      setVistaPubliTresMob(imagen[1]);
      setTypePubliTresMob(imagen[2]);
    }
    if(botonPubliCuatroActivoDesk==true){
      setPubliCuatroIdDesk(imagen[0])
      setVistaPubliCuatroDesk(imagen[1]);
      setTypePubliCuatroDesk(imagen[2]);
    }
    if(botonPubliCuatroActivoMob==true){
      setPubliCuatroIdMob(imagen[0])
      setVistaPubliCuatroMob(imagen[1]);
      setTypePubliCuatroMob(imagen[2]);
    }
    if(botonPubliCincoActivoDesk==true){
      setPubliCincoIdDesk(imagen[0])
      setVistaPubliCincoDesk(imagen[1]);
      setTypePubliCincoDesk(imagen[2]);
    }
    if(botonPubliCincoActivoMob==true){
      setPubliCincoIdMob(imagen[0])
      setVistaPubliCincoMob(imagen[1]);
      setTypePubliCincoMob(imagen[2]);
    }
    if(botonPubliSeisActivoDesk==true){
      setPubliSeisIdDesk(imagen[0])
      setVistaPubliSeisDesk(imagen[1]);
      setTypePubliSeisDesk(imagen[2]);
    }
    if(botonPubliSeisActivoMob==true){
      setPubliSeisIdMob(imagen[0])
      setVistaPubliSeisMob(imagen[1]);
      setTypePubliSeisMob(imagen[2]);
    }
    if(botonPubliSieteActivoDesk==true){
      setPubliSieteIdDesk(imagen[0])
      setVistaPubliSieteDesk(imagen[1]);
      setTypePubliSieteDesk(imagen[2]);
    }
    if(botonPubliSieteActivoMob==true){
      setPubliSieteIdMob(imagen[0])
      setVistaPubliSieteMob(imagen[1]);
      setTypePubliSieteMob(imagen[2]);
    }
        
  };

  useEffect(() => {
    if(modalMultimedia==false){
      setBotonPubliUnoActivoDesk(false);
      setBotonPubliUnoActivoMob(false);      
      setBotonPubliDosActivoDesk(false);      
      setBotonPubliDosActivoMob(false);      
      setBotonPubliTresActivoDesk(false);      
      setBotonPubliTresActivoMob(false);      
      setBotonPubliCuatroActivoDesk(false);
      setBotonPubliCuatroActivoMob(false);
      setBotonPubliCincoActivoDesk(false);
      setBotonPubliCincoActivoMob(false);
      setBotonPubliSeisActivoDesk(false);
      setBotonPubliSeisActivoMob(false);
      setBotonPubliSieteActivoDesk(false);
      setBotonPubliSieteActivoMob(false);
    }
  }, [modalMultimedia]);

  useEffect(() => {
    if (publiData != null && publiData.data != null) {
      setVistaPubliUnoDesk(publiData.data[0].path)
      setVistaPubliUnoMob(publiData.data[1].path)
      setVistaPubliDosDesk(publiData.data[2].path)
      setVistaPubliDosMob(publiData.data[3].path)
      setVistaPubliTresDesk(publiData.data[4].path)
      setVistaPubliTresMob(publiData.data[5].path)
      setVistaPubliCuatroDesk(publiData.data[6].path)
      setVistaPubliCuatroMob(publiData.data[7].path)
      setVistaPubliCincoDesk(publiData.data[8].path)
      setVistaPubliCincoMob(publiData.data[9].path)
      setVistaPubliSeisDesk(publiData.data[10].path)
      setVistaPubliSeisMob(publiData.data[11].path)   
      setVistaPubliSieteDesk(publiData.data[12].path)
      setVistaPubliSieteMob(publiData.data[13].path)
     

      setPubliUnoIdDesk(publiData.data[0].id)
      setPubliUnoIdMob(publiData.data[1].id)
      setPubliDosIdDesk(publiData.data[2].id)
      setPubliDosIdMob(publiData.data[3].id)
      setPubliTresIdDesk(publiData.data[4].id)
      setPubliTresIdMob(publiData.data[5].id)
      setPubliCuatroIdDesk(publiData.data[6].id)
      setPubliCuatroIdMob(publiData.data[7].id)
      setPubliCincoIdDesk(publiData.data[8].id)
      setPubliCincoIdMob(publiData.data[9].id)
      setPubliSeisIdDesk(publiData.data[10].id)
      setPubliSeisIdMob(publiData.data[11].id)
      setPubliSieteIdDesk(publiData.data[12].id)
      setPubliSieteIdMob(publiData.data[13].id)

      setTypePubliUnoDesk(publiData.data[0].type);
      setTypePubliUnoMob(publiData.data[1].type);
      setTypePubliDosDesk(publiData.data[2].type);
      setTypePubliDosMob(publiData.data[3].type);
      setTypePubliTresDesk(publiData.data[4].type);
      setTypePubliTresMob(publiData.data[5].type);
      setTypePubliCuatroDesk(publiData.data[6].type);
      setTypePubliCuatroMob(publiData.data[7].type);
      setTypePubliCincoDesk(publiData.data[8].type);
      setTypePubliCincoMob(publiData.data[9].type);
      setTypePubliSeisDesk(publiData.data[10].type);
      setTypePubliSeisMob(publiData.data[11].type);
      setTypePubliSieteDesk(publiData.data[12].type);
      setTypePubliSieteMob(publiData.data[13].type);

      setUrlPublicidades({
        urlPubliUnoDesk:publiData.data[0].url,
        urlPubliUnoMob:publiData.data[1].url,
        urlPubliDosDesk:publiData.data[2].url,
        urlPubliDosMob:publiData.data[3].url,
        urlPubliTresDesk:publiData.data[4].url,
        urlPubliTresMob:publiData.data[5].url,
        urlPubliCuatroDesk:publiData.data[6].url,
        urlPubliCuatroMob:publiData.data[7].url,
        urlPubliCincoDesk:publiData.data[8].url,
        urlPubliCincoMob:publiData.data[9].url,
        urlPubliSeisDesk:publiData.data[10].url,
        urlPubliSeisMob:publiData.data[11].url,
        urlPubliSieteDesk:publiData.data[12].url,
        urlPubliSieteMob:publiData.data[13].url,
      })

    }
}, [publiData]);

useEffect(() => {  
if(resUpdatePubli!=null && resUpdatePubli.message=="Actualizacion realizada correctamente"){
  dispatch(getListPublicidades());
  setNextStepModal(true);
}

}, [resUpdatePubli]);


  const onChangeUrlPublicidad = (e) => {
    setUrlPublicidades({
      ...urlPublicidades,
      [e.target.name]: e.target.value,
    });
    setBotonSubir(true)
  };


  return (
    <>
      <div className="container-entradas">
        <div className="container-tittle">
          <h2>Publicidad</h2>
        </div>       
          <form className="container-form-publi" onSubmit={handleSubmit(onSubmit)}>            
          <h4 className="subtittle-publi">Home</h4>
            <div className="child-form-publi">         
              <div className="container-image-publi">   
                <div className="container-image-publi-top-secction">  
                    <div>
                    <p className="tittle-publicidad">Superior Desktop</p>  
                    <p className="recomendado-texto">Tamaño recomendado 1170x130px</p>  
                    </div>
                    <div className="publicidad-seccion-botones">
                    <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliUnoActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                    <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliUnoIdDesk("Sin Publicidad");setVistaPubliUnoDesk("");setBotonSubir(true)}}>Eliminar</button>
                    </div>
                  </div>  
                  <input defaultValue={urlPublicidades.urlPubliUnoDesk!=null ? urlPublicidades.urlPubliUnoDesk :""} name="urlPubliUnoDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>
                <div className="container-input">     
                {vistaPubliUnoDesk!=null && typePubliUnoDesk!="video" && typePubliUnoDesk!="video/mp4"  ?            
                <img width={300} src={vistaPubliUnoDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliUnoDesk}>              
                </video> }
                </div>
              </div>
              <div className="container-image-publi">   
                <div className="container-image-publi-top-secction">  
                 <div> 
                    <p className="tittle-publicidad">Superior Mobile</p>  
                    <p className="recomendado-texto">Tamaño recomendado 360x130px</p>  
                  </div>                   
                    <div className="publicidad-seccion-botones">
                    <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliUnoActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                    <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliUnoIdMob("Sin Publicidad");setVistaPubliUnoMob("");setBotonSubir(true)}}>Eliminar</button>
                    </div>
                  </div>  
                  <input defaultValue={urlPublicidades.urlPubliUnoMob!=null ? urlPublicidades.urlPubliUnoMob : ""}  name="urlPubliUnoMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliUnoMob!=null && typePubliUnoMob!="video" && typePubliUnoMob!="video/mp4"  ? 
                <img width={300} src={vistaPubliUnoMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliUnoMob}>              
                </video> }
                </div>
              </div>                     
            </div>
            <div className="child-form-publi">   
              <div className="container-image-publi">
                <div className="container-image-publi-top-secction">  
                <div> 
                  <p className="tittle-publicidad"> Mid Desktop</p>
                    <p className="recomendado-texto">Tamaño recomendado 1170x130px</p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliDosActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliDosIdDesk("Sin Publicidad");setVistaPubliDosDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>
                </div>  
                <input defaultValue={urlPublicidades.urlPubliDosDesk!=null ? urlPublicidades.urlPubliDosDesk :""}  name="urlPubliDosDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliDosDesk!=null && typePubliDosDesk!="video" && typePubliDosDesk!="video/mp4" ? 
                <img width={300} src={vistaPubliDosDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliDosDesk}>              
                </video> }             
                </div>                
              </div>
              <div className="container-image-publi">
                <div className="container-image-publi-top-secction">                  
                <div> 
                  <p className="tittle-publicidad"> Mid Mobile</p>
                    <p className="recomendado-texto">Tamaño recomendado 360x130px</p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliDosActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliDosIdMob("Sin Publicidad");setVistaPubliDosMob("");setBotonSubir(true)}}>Eliminar</button>
                  </div>
                </div>  
                <input defaultValue={urlPublicidades.urlPubliDosMob!=null ? urlPublicidades.urlPubliDosMob :""} name="urlPubliDosMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliDosMob!=null && typePubliDosMob!="video" && typePubliDosMob!="video/mp4" ? 
                <img width={300} src={vistaPubliDosMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliDosMob}>              
                </video> }             
                </div>                
              </div>
            </div>

            <div className="child-form-publi">   
              <div className="container-image-publi">
                <div className="container-image-publi-top-secction">  
                <div> 
                  <p className="tittle-publicidad"> Inferior Desktop Izquierda</p>
                    <p className="recomendado-texto">Tamaño recomendado </p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliTresActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliTresIdDesk("Sin Publicidad");setVistaPubliTresDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

                </div>  
                <input defaultValue={urlPublicidades.urlPubliTresDesk!=null ? urlPublicidades.urlPubliTresDesk : ""}  name="urlPubliTresDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliTresDesk!=null && typePubliTresDesk!="video" && typePubliTresDesk!="video/mp4" ? 
                <img width={300} src={vistaPubliTresDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliTresDesk}>              
                </video> }             
                </div>                
              </div>
              <div className="container-image-publi">
                <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Inferior Mobile Izquierda</p>
                    <p className="recomendado-texto">Tamaño recomendado </p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliTresActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliTresIdMob("Sin Publicidad");setVistaPubliTresMob("");setBotonSubir(true)}}>Eliminar</button>
                  </div>
                </div>  
                <input defaultValue={urlPublicidades.urlPubliTresMob!=null ? urlPublicidades.urlPubliTresMob :""} name="urlPubliTresMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliTresMob!=null && typePubliTresMob!="video" && typePubliTresMob!="video/mp4" ? 
                <img width={300} src={vistaPubliTresMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliTresMob}>              
                </video> }             
                </div>                
              </div>
            </div>

            <div className="child-form-publi">   
              <div className="container-image-publi">
                <div className="container-image-publi-top-secction">  
                <div> 
                  <p className="tittle-publicidad"> Inferior Desktop Derecha</p>
                    <p className="recomendado-texto">Tamaño recomendado </p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliCuatroActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliCuatroIdDesk("Sin Publicidad");setVistaPubliCuatroDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>
                </div>  
                <input defaultValue={urlPublicidades.urlPubliCuatroDesk!=null ? urlPublicidades.urlPubliCuatroDesk :""}  name="urlPubliCuatroDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliCuatroDesk!=null && typePubliCuatroDesk!="video" && typePubliCuatroDesk!="video/mp4" ? 
                <img width={300} src={vistaPubliCuatroDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliCuatroDesk}>              
                </video> }             
                </div>                
              </div>
              <div className="container-image-publi">
                <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Inferior Mobile Derecha</p>
                    <p className="recomendado-texto">Tamaño recomendado </p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliCuatroActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliCuatroIdMob("Sin Publicidad");setVistaPubliCuatroMob("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

                </div>  
                <input defaultValue={urlPublicidades.urlPubliCuatroMob!=null ? urlPublicidades.urlPubliCuatroMob : ""}  name="urlPubliCuatroMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">     
                {vistaPubliCuatroMob!=null && typePubliCuatroMob!="video" && typePubliCuatroMob!="video/mp4" ? 
                <img width={300} src={vistaPubliCuatroMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliCuatroMob}>              
                </video> }             
                </div>                
              </div>
            </div>

            <h4 className="subtittle-publi">Post</h4>
            <div className="child-form-publi">
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Mid Desktop </p>
                    <p className="recomendado-texto">Tamaño recomendado 710x180</p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliCincoActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliCincoIdDesk("Sin Publicidad");setVistaPubliCincoDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

              </div>  
              <input defaultValue={urlPublicidades.urlPubliCincoDesk!=null ? urlPublicidades.urlPubliCincoDesk : ""}  name="urlPubliCincoDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">
                {vistaPubliCincoDesk!=null && typePubliCincoDesk!="video" && typePubliCincoDesk!="video/mp4" ? 
                <img width={300} src={vistaPubliCincoDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliCincoDesk}>              
                </video> }  
                </div>
              </div>
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Mid Mobile </p>
                    <p className="recomendado-texto">Tamaño recomendado 330x120</p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliCincoActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliCincoIdMob("Sin Publicidad");setVistaPubliCincoMob("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

              </div>  
              <input defaultValue={urlPublicidades.urlPubliCincoMob!=null ? urlPublicidades.urlPubliCincoMob : ""}  name="urlPubliCincoMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">
                {vistaPubliCincoMob!=null && typePubliCincoMob!="video" && typePubliCincoMob!="video/mp4" ? 
                <img width={300} src={vistaPubliCincoMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliCincoMob}>              
                </video> }  
                </div>
              </div>
            </div>

            <div className="child-form-publi">
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Footer Desktop </p>
                    <p className="recomendado-texto">Tamaño recomendado </p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliSeisActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliSeisIdDesk("Sin Publicidad");setVistaPubliSeisDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

              </div>  
              <input defaultValue={urlPublicidades.urlPubliSeisDesk!=null ? urlPublicidades.urlPubliSeisDesk : ""} name="urlPubliSeisDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">
                {vistaPubliSeisDesk!=null && typePubliSeisDesk!="video" && typePubliSeisDesk!="video/mp4" ? 
                <img width={300} src={vistaPubliSeisDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliSeisDesk}>              
                </video> }  
                </div>
              </div>
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <p className="tittle-publicidad"> Footer Desktop </p>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliSeisActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliSeisIdMob("Sin Publicidad");setVistaPubliSeisMob("");setBotonSubir(true)}}>Eliminar</button>
                  </div>  
              </div>  
              <input defaultValue={urlPublicidades.urlPubliSeisMob!=null ? urlPublicidades.urlPubliSeisMob : ""}  name="urlPubliSeisMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">
                {vistaPubliSeisMob!=null && typePubliSeisMob!="video" && typePubliSeisMob!="video/mp4" ? 
                <img width={300} src={vistaPubliSeisMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliSeisMob}>              
                </video> }  
                </div>
              </div>
            </div>

            <div className="child-form-publi">
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Sidebar Top </p>
                    <p className="recomendado-texto">Tamaño recomendado 260x520</p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliSieteActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliSieteIdDesk("Sin Publicidad");setVistaPubliSieteDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

              </div>  
              <input defaultValue={urlPublicidades.urlPubliSieteDesk!=null ? urlPublicidades.urlPubliSieteDesk : ""}  name="urlPubliSieteDesk" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">
                {vistaPubliSieteDesk!=null && typePubliSieteDesk!="video" && typePubliSieteDesk!="video/mp4" ? 
                <img width={300} src={vistaPubliSieteDesk}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliSieteDesk}>              
                </video> }  
                </div>
              </div>
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <div> 
                  <p className="tittle-publicidad"> Sidebar Top </p>
                    <p className="recomendado-texto">Tamaño recomendado </p>  
                  </div>
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliSieteActivoMob(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliSieteIdMob("Sin Publicidad");setVistaPubliSieteMob("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

              </div>  
              <input defaultValue={urlPublicidades.urlPubliSieteMob!=null ? urlPublicidades.urlPubliSieteMob : ""}  name="urlPubliSieteMob" placeholder="Url publicidad" className="input-style-grey" onChange={(e)=>onChangeUrlPublicidad(e)}/>

                <div className="container-input">
                {vistaPubliSieteMob!=null && typePubliSieteMob!="video" && typePubliSieteMob!="video/mp4" ? 
                <img width={300} src={vistaPubliSieteMob}/>
                :                
                <video width={300} controls autoPlay loop muted src={vistaPubliSieteMob}>              
                </video> }  
                </div>
              </div>
            </div>

            {/* ##YOUTUBE URLLLLLLLLLL*/}
            
            <h4 className="subtittle-publi">URL YouTube</h4>
            <div className="child-form-publi">
              <div className="container-image-publi">
              <div className="container-image-publi-top-secction">  
                  <div className="publicidad-seccion-botones">
                  <button type="button" className="boton-file-subir"  onClick={()=>{setBotonPubliCincoActivoDesk(true);setModalMultimedia(true)}}>Agregar</button>
                  <button type="button" className="boton-file-eliminar"  onClick={()=>{setPubliCincoIdDesk("Sin Publicidad");setVistaPubliCincoDesk("");setBotonSubir(true)}}>Eliminar</button>
                  </div>

              </div>  
              <input defaultValue={urlPublicidades.urlPubliCincoDesk!=null ? urlPublicidades.urlPubliCincoDesk : ""}  name="urlPubliCincoDesk" placeholder="Url YouTube" className="input-style-grey-youtube" onChange={(e)=>onChangeUrlPublicidad(e)}/>

              </div>

            </div>


              {botonSubir && <button type="submit"  className='button-save-publicidad'>Subir publicidad</button>}


          </form>
        
      </div>

      <ModalMultimedia onDataChange={onDataChange} open={modalMultimedia} setOpen={setModalMultimedia} setImageUrl={setImageUrl} setTypeMedia={setTypeMedia} typeMedia={""}/>

      <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openPublicando} onClose={handleClose}>
       {nextStepModal==false ?
        <Modal.Body>         
          <div className="container-text-modal">
            <p className="text-publicando">Publicando</p>
            <span class="loader"></span>
          </div>
          </Modal.Body>
          :
          <>
          <Modal.Body>  
          <div className="container-text-modal inline-text">
            <BsFillCheckCircleFill/>
            <h4>Publicidad subida correctamente</h4>
          </div>        
        </Modal.Body>
       <Modal.Footer className="container-footer">
          <Button className="boton-cerrar" onClick={handleClose} >
            Cerrar
          </Button>
        </Modal.Footer> 
        </>  }
      </Modal>
    </>
  );
}


