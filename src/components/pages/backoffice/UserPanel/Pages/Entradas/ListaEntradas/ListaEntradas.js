import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import { Pagination, SelectPicker } from 'rsuite';
import { Button, ButtonToolbar, ButtonGroup, IconButton } from 'rsuite';
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';

import { getListPostGeneral } from "../../../../../../../actions/listPostGeneral";
import { setDataPost } from "../../../../../../../actions/dataPost";
import { setEliminarPost } from "../../../../../../../actions/eliminarPost";
import { useSpring, animated } from "react-spring";

import "./listaEntradas.css";
import ModalEliminar from "../../Medios/ModalVerMedia/ModalEliminar";

export default function ListaEntradas() {

  const dispatch = useDispatch();

  const listaPostGeneral = useSelector((state) => state.reducerListPost.data);
  const listacategorias = useSelector((state) => state.reducerCategorias.data);

  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 250,
  });


  if (listacategorias != null && listacategorias.data != "") {
    var mapListaCategorias = [];
    const lc = listacategorias.data;
    for (var i = 0; i < lc.length; i++) {
      mapListaCategorias.push({
        value: lc[i].nombre,
        label: lc[i].nombre,
      });
    }
  }

  //ARRAY ID POSTEO
  const [arrayIdPosteos, setArrayIdPosteos] = useState([]);
  const handleCheckboxArray = (event) => {
    var arrayids = [...arrayIdPosteos];
    // var existeElemento = dataFile.vuelos.find(element => element.id == event.target.value);
    if (event.target.checked) {
      arrayids = [...arrayIdPosteos, event.target.value];
    } else {
      arrayids.splice(arrayIdPosteos.indexOf(event.target.value), 1);
    }
    setArrayIdPosteos(arrayids);
  }

  //ELIMINAR POSTEO
  function eliminarPosteo() {
    const dataEliminarPosteo = {
      idPosts: arrayIdPosteos,
    }
    dispatch(setEliminarPost(dataEliminarPosteo));
  }

  //LIMPIAR CHECKBOX
  function uncheckAll() {
    document.querySelectorAll('input[type=checkbox]').forEach(function (checkElement) {
      checkElement.checked = false;
    });
  }

  const respuestaEliminarPost = useSelector((state) => state.reducerRespuestaEliminarPost.data);
  useEffect(() => {
    if (respuestaEliminarPost != null) {
      if (respuestaEliminarPost.response === 'Posteos eliminados correctamente') {
        setArrayIdPosteos([]);
        const data = {
          medio: "",
          busqueda: busqueda.dataBase,
          page: activePage,
          estado: estadoFiltro,
          categoria: activeCategoria,
          autor: '',
          fechaInicio: '',
          fechaFin: '',
          titulo: '',
          limit: 15
        };
        dispatch(getListPostGeneral(data));
        uncheckAll()
      }
    }
  }, [respuestaEliminarPost])
  var objetoAereo = {}
  //TABLA POSTEOS GENERALES
  const navigate = useNavigate();
  function handleEditarEntrada(e) {

    objetoAereo = listaPostGeneral.data.find(element => element.id == e.target.value);
    if (objetoAereo != null) {
      localStorage.setItem("dataPostEdit", JSON.stringify(objetoAereo))
      navigate('/panel-user/editar-entrada')
    }

  }

  if (listaPostGeneral != null && listaPostGeneral.data != "") {
    const listPost = listaPostGeneral.data;
    var arrayListaPost = [];
    var estadoFondo = false;
    for (var e = 0; e < listPost.length; e++) {
      { estadoFondo = !estadoFondo }
      arrayListaPost.push(
        <>
          <div className={`table-header  ${estadoFondo ? "table-header-content" : 'table-header-content-white'}`} >
            <div className="header-check container-checkbox">
              <input value={listPost[e].id} onClick={(e) => handleCheckboxArray(e)} className="lista-check" type="checkbox" />
            </div>
            <div className="post-tittle"> <p className="p-title-entradas">{listPost[e].titulo}</p> </div>
            <div className="header-tittle nombre-periodista"> {listPost[e].redactor.nombre} </div>
            <div className="header-tittle">
              <p className="post-categorias">
                {listPost[e].categorias.map((item, key) => {
                  return (item.nombre + ', ')
                })}
              </p>
            </div>
            <div className="header-tittle"> Etiquetas </div>
            <div className="header-tittle">
              <p>Última modificación</p>
              {listPost[e].dateUpdate.date.substring(0, 10)} a las {listPost[e].dateUpdate.date.substring(11, 16)}hs
            </div>
            <div style={{ width: '10%' }}>
              <Button type="button" value={listPost[e].id} onClick={(e) => handleEditarEntrada(e)} >
                <EditIcon className="icon-style" />
              </Button>
            </div>
          </div>
        </>
      );
    }
  }

  //LIST POST GENERAL
  const [activePage, setActivePage] = useState(1);
  const [activeFiltro, setActiveFiltro] = useState(true);
  const [activeCategoria, setActiveCategoria] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('')
  const [busqueda, setBusqueda] = useState({
    dataBase: '',
  });

  useEffect(() => {
    const data = {
      medio: "",
      busqueda: busqueda.dataBase,
      page: activePage,
      estado: estadoFiltro,
      categoria: activeCategoria,
      autor: '',
      fechaInicio: '',
      fechaFin: '',
      limit: 15
    };
    dispatch(getListPostGeneral(data));
  }, [activePage, estadoFiltro, activeCategoria]);

  
  useEffect(() => {
    const data = {
      medio: "",
      busqueda: busqueda.dataBase,
      page: 1,
      estado: estadoFiltro,
      categoria: '',
      autor: '',
      fechaInicio: '',
      fechaFin: '',
      limit: 15
    };
    dispatch(getListPostGeneral(data));
  }, [busqueda]);

  const handleFiltros = (e) => {
    if (e.target.value == '') {
      setEstadoFiltro('');
      setActiveFiltro(!activeFiltro)
    }
    if (e.target.value == 2) {
      setEstadoFiltro(2);
      setActiveFiltro(!activeFiltro)
    }
    if (e.target.value == 4) {
      setEstadoFiltro(4);
      setActiveFiltro(!activeFiltro)
    }
  }

  console.log(estadoFiltro)

  const handleChangeBuscador = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangeCategoria = (e) => {
    setActiveCategoria(e);
  }

  const locale = {
    noResultsText: "No existen resultados",
    placeholder: "",
    searchPlaceholder: "Buscar...",
    checkAll: "",
  };

  const [openEliminar, setOpenEliminar] = useState(false);
  const handleOpen = () => setOpenEliminar(true);
  const handleClose = () => setOpenEliminar(false);


  return (
    <>
      <div className='container-entradas'>
        <div className='container-tittle '>
          <h2>Entradas</h2>
        </div>
        <div className="container-filtros-general">
          <div className="child-container-filtros-general">
            <div className="container-filter-left">
              <div>
                 <a className="button-green-editor" target="_blank" href="https://editor.fourcapital.com.ar/panel-user/nueva-entrada" > Nueva entrada </a>
              </div>
              <div className="container-buttons">
                <button className={estadoFiltro == '' ? "button-entrada-activado" : "button-entrada"} value={''} onClick={(e) => handleFiltros(e)}> Todo ({listaPostGeneral != null ? listaPostGeneral.cantTotalPostApp : ''}) </button>
                <div className="border-separate"></div>
                <button className={estadoFiltro == 2 ? "button-entrada-activado" : "button-entrada"} value={2} onClick={(e) => handleFiltros(e)}> Publicados ({listaPostGeneral != null ? listaPostGeneral.cantPostPublicados : ''}) </button>
                <div className="border-separate"></div>
                <button className={estadoFiltro == 4 ? "button-entrada-activado" : "button-entrada"} value={4} onClick={(e) => handleFiltros(e)}> Borradores ({listaPostGeneral != null ? listaPostGeneral.cantPostBorradores : ''}) </button>
              </div>
              <div className="container-buttons">
                <div>
                  <ButtonToolbar onClick={()=> {handleOpen()}}>
                    <IconButton icon={<TrashIcon className="icon-style" />} size="lg" />
                  </ButtonToolbar>
                </div>
                <SelectPicker className="select-style" onChange={(value, e) => handleChangeCategoria(value)} onClean={(value, e) => handleChangeCategoria("")}
                  placeholder={"Seleccione una categoria"} data={mapListaCategorias} locale={locale} />
              </div>
            </div>
            <div className="container-filter-right">
              <InputGroup inside onChange={handleChangeBuscador}>
                <Input value={busqueda.dataBase} name="dataBase" placeholder={"Buscar..."} />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
              {/* <input type="search" className="search-style" value={busqueda.dataBase} name="dataBase" placeholder='Buscar...' onChange={handleChangeBuscador} /> */}
              <Pagination
                prev
                last
                next
                first
                size="md"
                total={listaPostGeneral != null ? listaPostGeneral.totalRegisters : ""}
                limit={15}
                activePage={activePage}
                onChangePage={setActivePage}
                maxButtons={1}
                ellipsis={true}
                boundaryLinks={true}
              />
            </div>
          </div>
          <div className="container-table">
            <div className="table-header">
              <div className="header-check">
                {/* <input onClick={(e) => handleCheckboxArray(e)} className="lista-check" type="checkbox" /> */}
              </div>
              <div className="tittle-header"> Título </div>
              <div className="navbar-header"> Autor </div>
              <div className="navbar-header"> Categorias </div>
              <div className="navbar-header"> Etiquetas </div>
              <div className="navbar-header"> Fecha </div>
              <div style={{ width: '10%' }}>
                {/* <button onClick={(e) => handleEditarEntrada(e)}> Editar</button> */}
              </div>
            </div>
            <div className="container-scroll-post">
              {arrayListaPost}
            </div>
          </div>
        </div>
        <ModalEliminar openEliminar={openEliminar} setOpenEliminar={setOpenEliminar} handleClose={handleClose} eliminarPosteo={eliminarPosteo}/>
      </div>
    </>
  )
}
