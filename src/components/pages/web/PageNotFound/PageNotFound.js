import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavbarEditor from '../../../navbar/Navbar';
import Footer from '../../../footer/Footer';
import Loading from '../../../Loading/Loading';
import './pageNotFound.css';

export default function PageNotFound() {

  const [theme, setTheme] = useState();
  const dataPostByPath = useSelector((state) => state.reducerDataPostPath.data);
  const listPosts = useSelector((state) => state.reducerPosts.data);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("dataPostNota") == null) {
  //     if (dataPostByPath == "la ruta no existe") {
  //       console.log(dataPostByPath)
  //       navigate("/no-existe-noticia");
  //     }
  //   }
  // }, [dataPostByPath]);

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 50,
  });

  return (
    <>
      <animated.div style={fadeOut}>
        {/* <div className="app" id={theme}>
          <NavbarEditor theme={theme} setTheme={setTheme} />
          {dataPostByPath != "la ruta no existe" ?
            <Loading />
            :
            <div className="post-completo-container">
              <div className='container-404'>
                <h1>La noticia que intenta acceder no existe.</h1>
                <br></br>
                <Link className='ruta-home' to="/">Volver al home</Link>
              </div>
            </div>
          }
          <Footer />
        </div> */}
      </animated.div>
    </>
  )
}
