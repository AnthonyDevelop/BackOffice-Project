import React, { useState, useEffect } from "react";
import { Pagination } from "rsuite";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup, Grid, Row, Col } from 'rsuite';
import { Button, ButtonToolbar, ButtonGroup, Modal, IconButton } from 'rsuite';

import { getRecibirCategorias } from "../../../../../../actions/listaCategorias";
import { setCrearCategoria } from "../../../../../../actions/listaCategorias";
import { setEliminarCategoria } from "../../../../../../actions/listaCategorias";

import TrashIcon from '@rsuite/icons/Trash';
import SearchIcon from '@rsuite/icons/Search';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoCloseCircleSharp } from 'react-icons/io5';

import './categorias.css'
import { getListCategoriasSinSub } from "../../../../../../actions/listCategoriaSinSub";

export default function Categorias() {
  const dispatch = useDispatch();

  //MODAL AVISOS
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenError = () => setOpenError(true);
  const [nextStepModal, setNextStepModal] = useState(false);
  const [puedeEliminar, setPuedeEliminar] = useState(true);
  const [categoriaVacia, setCategoriaVacia] = useState(false);
  const [categoriaExiste, setCategoriaExiste] = useState(false);
  const [openPublicando, setOpenPublicando] = useState(false);
  const [nextStepModalError, setNextStepModalError] = useState(false);
  const [arrayIdCategorias, setArrayIdCategorias] = useState([]);
  const [arrayIds, setArrayIds] = useState([]);
  const [arrayObjeto, setArrayObjeto] = useState([]);

  const pressBorrar = (e) => {
    if (e.key === 'Backspace') {
      setCategoriaVacia(false)
      setCategoriaExiste(false)
    }
  }

  const handleClose = () => {
    setOpen(false);
    setOpenPublicando(false);
    setOpenError(false);
    setArrayObjeto([]);
    setArrayIds([]);
  }

  const [activePage, setActivePage] = useState(1);
  const [busqueda, setBusqueda] = useState({
    dataBase: '',
  });

  const [agregarCategoria, setAgregarCategoria] = useState({
    nombreCategoria: ''
  });

  const onChangeCategoria = (e) => {
    setAgregarCategoria({
      ...agregarCategoria,
      [e.target.name]: e.target.value,
    });
    setCategoriaVacia(false)
    setOpenPublicando(false);
    setOpenError(false);
    setNextStepModal(false)
  }

  function handleCrearCategoria() {
    if (agregarCategoria.nombreCategoria != '') {
      const dataCategoria = {
        nombreCategoria: agregarCategoria.nombreCategoria,
      }
      dispatch(setCrearCategoria(dataCategoria));
      setOpenPublicando(true);
      setCategoriaVacia(false);
      setCategoriaExiste(false);
    } else {
      setCategoriaVacia(true);
      setCategoriaExiste(false);
    }
  }

  useEffect(() => {
    const dataCategoria = {
      page: activePage,
      nombre: busqueda.dataBase
    }
    dispatch(getListCategoriasSinSub(dataCategoria));
  }, [activePage, busqueda])

  const respuestaCategoria = useSelector((state) => state.reducerRespuestaCategoria.data);

  useEffect(() => {
    if (respuestaCategoria != null) {
      if (respuestaCategoria.message === "Categoria creada") {
        const dataCategoria = {
          page: activePage,
          nombre: busqueda.dataBase
        }
        dispatch(getListCategoriasSinSub(dataCategoria));
        setNextStepModal(true);
        setAgregarCategoria({
          nombreCategoria: '',
        })
      }
      if (respuestaCategoria.message === "Error - La categoria ya existe") {
        setOpenPublicando(false)
        setCategoriaVacia(false)
        setCategoriaExiste(true)
      }
    }
  }, [respuestaCategoria])

  //LISTA CATEGORIAS
  const listcategoriassinsub = useSelector((state) => state.reducerListCategoriaSinSub.data);

  var estadoFondo = false;
  function getListaCategorias(arrayCategorias, listDeCategorias) {
    { estadoFondo = !estadoFondo }
    arrayCategorias.push(
      <>
        <div className={`table-header-categorias ${estadoFondo ? "table-header-content-categorias " : 'table-header-content-white-categorias '}`} >
          <div className="header-check-categorias container-checkbox">
            <input value={listDeCategorias[e].id}
              checked={arrayIds.includes(listDeCategorias[e].id) ? true : false}
              onClick={(e) => handleCheckboxArray(e)}
              type="checkbox" />
          </div>
          <div className="header-tittle"> {listDeCategorias[e].nombre} </div>
          <div className="header-tittle"> {listDeCategorias[e].cantPosteos} </div>
        </div>
      </>
    );
  }

  if (listcategoriassinsub != null && listcategoriassinsub.data != "") {
    const listDeCategorias = listcategoriassinsub.data;
    var arrayCategorias = [];
    if (listDeCategorias.length > 2) {
      for (var e = 2; e < listDeCategorias.length; e++) {
        getListaCategorias(arrayCategorias, listDeCategorias);
      }
    } else {
      for (var e = 0; e < listDeCategorias.length; e++) {
        getListaCategorias(arrayCategorias, listDeCategorias);
      }
    }
  }

  const handleChangeBuscador = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  }

  //ARRAY NOMBRES CATEGORIAS
  const handleCheckboxArray = (event) => {
    var objetoCategoria = listcategoriassinsub.data.find(element => element.id == event.target.value);

    var arrayids = [...arrayIdCategorias];
    var arrayIdCat = [...arrayIds];
    var arrayCategObjeto = [...arrayObjeto];

    if (event.target.checked) {
      arrayids = [...arrayIdCategorias, objetoCategoria.nombre];
      arrayIdCat = [...arrayIds, objetoCategoria.id];
      arrayCategObjeto = [...arrayObjeto, objetoCategoria.cantPosteos];
    } else {
      arrayids.splice(arrayIdCategorias.indexOf(objetoCategoria.nombre), 1);
      arrayIdCat.splice(arrayIds.indexOf(objetoCategoria.id), 1);
      arrayCategObjeto.splice(arrayObjeto.indexOf(objetoCategoria.cantPosteos), 1);
    }
    setArrayIdCategorias(arrayids);
    setArrayIds(arrayIdCat);
    setArrayObjeto(arrayCategObjeto);
  }

  useEffect(() => {
    const existenPosteos = arrayObjeto.some((number) => number > 0);
    if (existenPosteos) {
      setPuedeEliminar(false)
    } else {
      setPuedeEliminar(true)
    }
  }, [arrayObjeto])

  //ELIMINAR CATEGORIA
  function eliminarCategoria() {
    const dataEliminarCategorias = {
      idCategorias: arrayIdCategorias,
    }
    dispatch(setEliminarCategoria(dataEliminarCategorias));
    setOpen(false)
  }

  //LIMPIAR CHECKBOX
  function uncheckAll() {
    document.querySelectorAll('input[type=checkbox]').forEach(function (checkElement) {
      checkElement.checked = false;
    });
  }

  const [estadoButtonEliminar, setEstadoButtonEliminar] = useState(false);
  useEffect(() => {
    if (arrayIdCategorias.length > 0) {
      setEstadoButtonEliminar(true);
    }
    else {
      setEstadoButtonEliminar(false);
    }
  }, [estadoButtonEliminar, arrayIdCategorias])

  useEffect(() => {
    if (respuestaCategoria != null) {
      if (respuestaCategoria.message === "Categorias eliminadas correctamente") {
        setArrayIdCategorias([]);
        const dataCategoria = {
          page: activePage,
          nombre: busqueda.dataBase
        }
        dispatch(getListCategoriasSinSub(dataCategoria));
        uncheckAll()
      }
    }
  }, [respuestaCategoria])

  return (
    <>
      <div className='container-entradas'>
        <div className='container-tittle'>
          <h2>Categorías</h2>
        </div>
        <div className="container-lista-categorias">
          <div className="container-left-categoria">
            <p>Añadir una categoría</p>
            <div className="child-container-agregar-categoria">
              <label>Nombre</label>
              <input className="input-style-green" value={agregarCategoria.nombreCategoria} name="nombreCategoria" type="text" onKeyPress={(e) => pressBorrar(e)} onChange={(e) => onChangeCategoria(e)} />
              {categoriaExiste == true ? <p className="error">Esta categoria ya existe!</p> : ''}
              {categoriaVacia == true ? <p className="error">Ingrese un nombre de categoria.</p> : ''}
              <label>Este nombre aparecerá en el sitio.</label>
            </div>
            <button className="button-crear-categoria" onClick={handleCrearCategoria}>Crear</button>
          </div>

          <div className="container-right-categorias">
            <div className="container-filter">
              <div className="container-filter-delete">
                {estadoButtonEliminar == true ?
                  <ButtonToolbar ButtonToolbar onClick={puedeEliminar == true ? handleOpen : handleOpenError}>
                    <IconButton icon={<TrashIcon className="icon-style" />} size="lg" />
                  </ButtonToolbar>
                  : ''
                }
              </div>
              <div className="container-filter-right">

                <InputGroup inside onChange={handleChangeBuscador} >
                  <Input value={busqueda.dataBase} name="dataBase" placeholder={"Buscar categorias..."} />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>

                <Pagination
                  prev
                  next
                  first
                  last
                  size="md"
                  total={listcategoriassinsub != null ? listcategoriassinsub.totalRegisters : ""}
                  limit={11}
                  activePage={activePage}
                  onChangePage={setActivePage}
                  maxButtons={1}
                  ellipsis={true}
                  boundaryLinks={true}
                />
              </div>
            </div>
            <div className="container-array-categoria">
              <div className="child-container-categoria">
                <div className="table-header-categorias">
                  <div className="header-check-categorias"> </div>
                  <div className="header-tittle"> Título </div>
                  <div className="header-tittle"> Cantidad de posteos </div>
                </div>
                {arrayCategorias}
              </div>
            </div>
            <div className="footer-categorias">
              <p>
                Al eliminar una categoría no se eliminan las entradas de esa categoría.
                En su lugar, las entradas que solo se asignaron a la categoría borrada,
                se asignan a la categoría por defecto Uncategorized. La categoría por
                defecto no se puede borrar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL AVISOS */}
      <Modal className="container-modal-aviso" backdrop={'static'} keyboard={false} open={open} onClose={handleClose}>
        <Modal.Body>
          <div className="container-text-modal">
            <h4>¿Desea eliminar la/s categoría/s?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button onClick={() => { eliminarCategoria(); handleClose() }} className="boton-ir">
            Eliminar
          </Button>
          <Button className="boton-cerrar" onClick={handleClose} >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL AFIRMATIVO */}
      <Modal className="container-modal-aviso loading-post-modal" size={"md"} backdrop={'static'} keyboard={false} open={openPublicando} onClose={handleClose}>
        {nextStepModal == false ?
          <Modal.Body>
            <div className="container-text-modal">
              <p className="text-publicando"><b>Creando categoría</b></p>
              <span class="loader"></span>
            </div>
          </Modal.Body>
          :
          <>
            <Modal.Body>
              <div className="container-text-modal inline-text">
                <BsFillCheckCircleFill />
                <h4>Categoría creada correctamente</h4>
              </div>
            </Modal.Body>
            <Modal.Footer className="container-footer">
              <Button className="boton-cerrar" onClick={handleClose} >
                Cerrar
              </Button>
            </Modal.Footer>
          </>}
      </Modal>

      {/* MODAL ERROR */}
      <Modal className="container-modal-aviso modal-error" backdrop={'static'} keyboard={false} open={openError} onClose={handleClose}>
        <Modal.Body>
          <div className="container-text-modal inline-text">
            <IoCloseCircleSharp />
            <h4>Esta categoria aún tiene noticias asignadas</h4>
            <p>Asigna una nueva categoria y vuelve a intentarlo</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="container-footer">
          <Button className="boton-cerrar" onClick={handleClose} >
            Cerrar
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  )
}
