
import React, { useState, useEffect } from 'react';
import './reproductor.css';
import axios from "axios";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const API = "AIzaSyBiPwT8is_KRC9lb8IUKNqD38onbPTFvLc";
const channelId = "UCYa3DZYrcMyaw8BR6VGMGdQ";
// var fetchURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6`;
var fetchURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;

export default function ReproductorOeste(props) {
    // const [link] = useState("https://www.youtube.com/embed/" + props.link + "?enablejsapi=1&origin=https://editor.fourcapital.com.ar");

    // const [postYoutube, setPostYoutube] = React.useState(null);

    //  useEffect(() => {
    //   axios.get(baseURL).then((response) => {
    //     setPostYoutube(response.data);
    //   });
    // }, []);

    // if (!postYoutube) return null;
    const [allVideos, setAllVideos] = useState([])
    useEffect(() => {
        fetch(fetchURL).then((response) => response.json()).then((resJson) => {
            const result = resJson.items.map(doc => ({
                ...doc,
                VideoLink: "https://www.youtube.com/embed/" + doc.id.videoId
            }))
            setAllVideos(result)
        }).catch()
    }, []);
    return (
        <>
            <div className='contenedor-iframe-youtube'>
                <Swiper navigation={true} modules={[Navigation]} spaceBetween={30} centeredSlides={true} className="mySwiper-youtube">
                    {allVideos.map((item => {
                        return (
                            <SwiperSlide>

                                <iframe id="player" type="text/html" width="600" height="300"
                                    src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
                                    frameborder="0"></iframe>
                            </SwiperSlide>
                        )
                    }))}
                </Swiper>
                {/* <div>
                    {allVideos.map((item => {
                        return (
                            <div>
                                <iframe src={item.VideoLink}></iframe>
                            </div>
                        )
                    }))}
                </div> */}
            </div>
        </>
    );
}