import React,{useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useSelector, useDispatch } from "react-redux";
import CarrouselModal from "./CarrouselModal";

import 'swiper/swiper.min.css'
import { getListMultimedia } from "../../../../../../../../../actions/listMultimedia";


export default function Carrousel(props) {
    const [open, setOpen] = useState();    
    const data = props.data;
    const [imageUrl, setImageUrl]=useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const onDataChange=props.onDataChange;
    const [typeMedia, setTypeMedia]=useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    useEffect(() => {
      const dataMultimedia={
        nombre:"",
        type:"",
        page:1,
    }
    dispatch(getListMultimedia(dataMultimedia));
  }, [])  
console.log(imageUrl.length)
console.log(data)
  return (
    <>
    {imageUrl.length>0 && open==false ? 
    ( <>
      <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="slider-superior-grande"
      >   

      { imageUrl.map((item,key)=>{
      return(
        <>
        <SwiperSlide>
          <img src={item}/>
        </SwiperSlide>
        </>
      )
    })}   
    </Swiper>
    <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="slider-inferior-thumbail"
      >
              { imageUrl.map((item,key)=>{
      return(
        <>
        <SwiperSlide>
          <img src={item}/>
        </SwiperSlide>
        </>
      )
    })}  
    </Swiper>
    </>)
    : data !=null && data[1]!=null ? 
    (
    <>
      <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="slider-superior-grande"
      >   

    {data[1].map((item,key)=>{
      return(
        <>
        <SwiperSlide>
          <img src={item}/>
        </SwiperSlide>
        </>
      )
    })}   
    </Swiper>
    <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="slider-inferior-thumbail"
      >
       {data[1].map((item,key)=>{
      return(
        <>
        <SwiperSlide>
          <img src={item}/>
        </SwiperSlide>
        </>
      )
    })}  
    </Swiper>
    </>)
      :
      
      <div class="cdx-button" onClick={()=>setOpen(true)}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
      </svg>
      Agregar Carrousel
    </div>
    }
      <CarrouselModal open={open} setOpen={setOpen} setImageUrl={setImageUrl} imageUrl={imageUrl} onDataChange={onDataChange}/>
    </>
  );
}
