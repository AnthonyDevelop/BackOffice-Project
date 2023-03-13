
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import './buscador.css'
import { Icon } from "@rsuite/icons";
import { useNavigate } from 'react-router-dom';

function Buscador(props) {

  const [fullscreen, setFullscreen] = useState(true);
  const [buscador, setBuscador] = useState('');

  const show = props.show;
  const onHide = props.handleClose;
  const setShow = props.setShow;
  const theme = props.theme;
  const styles = {
    width: 300,
    marginBottom: 10
  };

  const handleChangeBuscar = (e) => {
    setBuscador({
      ...buscador,
      [e.target.name]: e.target.value,
    });
  }

  //LISTA DE LAS SUGERENCIAS
  const listPosts = useSelector((state) => state.reducerPosts.data);

  const navigate = useNavigate();
  const pressEnter = (e) => {
    if (e.key === 'Enter' && buscador != '' && buscador.buscar != '') {
      localStorage.setItem("dataBuscador", buscador.buscar)
      navigate('/busqueda/' + buscador.buscar)
      setShow(!show)
    }
  }

  return (
    <>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} bg={theme} id={theme}>
        <Modal.Header style={{ border: '0',padding:'0px'}} closeButton></Modal.Header>
        <Modal.Body data-aos="fade-in-up" className='contenedor-buscador'>

          <div className='box-button-buscador'>
            <input
              className='button-buscador'
              name="buscar"
              placeholder="Buscar..."
              onChange={handleChangeBuscar}
              autoComplete="off"
              defaultValue={buscador.buscar}
              onKeyPress={(e) => pressEnter(e)}
            />
            {buscador != '' && buscador.buscar != '' &&
              <Link data-aos="fade-in" data-aos-duration="1000" className='prueba-icon'
                to={'/busqueda/' + buscador.buscar}
                onClick={() => { localStorage.setItem("dataBuscador", buscador.buscar); setShow(!show) }}
                icon={
                  <Icon
                    color='white !important'
                    className='icono-modal-buscador'
                  />
                }
              >
                <AiOutlineArrowRight className='mobile-vista' color='white' fontSize={30} />
              </Link>
            }
          </div>

          <div className='box-sugerencias-buscador' data-aos="zoom-in" data-aos-duration="1000">
            <div className='box-arreglo-sugerencias'>
              <p className='titulo-buscador-sugerencias'>Sugerencias</p>
              {listPosts != null && listPosts.data != "" &&

                listPosts.data[1].map((item, key) => {
                  if (key < 5) {
                    return (
                      <Link to={"/" + item.path}
                        onClick={() => { localStorage.setItem("dataPostNota", JSON.stringify(item)); setShow(!show) }}
                        className='container-link-posteo'>
                        <div className='cuadrado'></div>
                        {item.titulo}
                      </Link>
                    );
                  }
                }
                )}

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Buscador