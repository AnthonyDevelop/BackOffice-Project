
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import './buscador.css'
import { Icon } from "@rsuite/icons";
import ResultadoBusqueda from './ResultadoBusqueda';
import { Input, InputGroup } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@rsuite/icons/Search';
import { CLOSING } from 'ws';

function BuscadorOeste(props) {

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
    if (e.key === 'Enter') {
      localStorage.setItem("dataBuscadorOeste", buscador.buscar)
      navigate('/busquedaOeste/' + buscador.buscar)
      setShow(!show)
    }

  }

  return (
    <>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} bg={theme} id={theme}>
        <Modal.Header style={{ border: '0' }} closeButton></Modal.Header>
        <Modal.Body data-aos="zoom-in-up" className='contenedor-buscador'>

          <div className='box-button-buscador'>
            <input
              className='button-buscador'
              name="buscar"
              placeholder="Buscar..."
              onChange={handleChangeBuscar}
              autoComplete="no"
              defaultValue={buscador.buscar}
              onKeyPress={(e) => pressEnter(e)}
            />

            {buscador != '' && buscador.buscar != '' &&
              <Link data-aos="zoom-in" data-aos-duration="1000" className='prueba-icon'
                to={'/busquedaOeste/' + buscador.buscar}
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
              <p className='titulo-buscador-sugerencias-oeste'>Sugerencias</p>
              {listPosts != null && listPosts.data != "" &&

                listPosts.data[1].map((item, key) => {
                  if (key < 5) {
                    return (
                      <Link to={"/suplemento/op/" + item.path}
                        onClick={() => { localStorage.setItem("dataPostNota", JSON.stringify(item)); setShow(!show) }}
                        className='container-link-posteo-oeste'>
                        <div className='cuadrado-oeste'></div>
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

export default BuscadorOeste