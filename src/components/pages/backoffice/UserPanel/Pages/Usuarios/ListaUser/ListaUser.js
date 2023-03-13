import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, SelectPicker } from 'rsuite';
import { useSelector, useDispatch } from "react-redux";
import { getListUser } from "../../../../../../../actions/listUser";
import { useSpring, animated } from "react-spring";

import './listaUser.css';

export default function ListaUser() {
  const dispatch = useDispatch();

  const listaUsuarios = useSelector((state) => state.reducerListaUser.data);
  const listacategorias = useSelector((state) => state.reducerCategorias.data);
  console.log(listaUsuarios)
  const fadeOut = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 450,
  });

  //TABLA POSTEOS GENERALES
  if (listaUsuarios != null && listaUsuarios.data != "") {
    const listUser = listaUsuarios.data;
    var arrayListaPost = [];
    var estadoFondo = false;
    for (var e = 0; e < listUser.length; e++) {
      { estadoFondo = !estadoFondo }
      arrayListaPost.push(
        <>
          <div className={`table-header  ${estadoFondo ? "table-header-content" : 'table-header-content-white'}`} >
            {/* <div className="header-check  container-checkbox"> <input className="lista-check" type="checkbox" /> </div> */}
            <div className="header-tittle-users ">{listUser[e].id}</div>
            <div className="header-tittle-users">
              <div className="box-name-foto-users">
                {listUser[e].pathFotoPerfil != "Sin Foto" ?
                  <img className="list-user-image" src={listUser[e].pathFotoPerfil} />
                  :
                  <img className="list-user-image" src="https://res.cloudinary.com/grupo-delsud/image/upload/v1670252546/eleditorNoticias/Group_17778_ujcekc_1_otlhmv.svg" />
                }
                <p style={{textAlign:'start'}}>{listUser[e].nombre + ' ' + listUser[e].apellido}</p>
              </div>
            </div>
            <div className="header-tittle-users"> {listUser[e].email} </div>
            <div className="header-tittle-users"> {listUser[e].cantidadEntradas} </div>
            <div className="header-tittle-users"> {listUser[e].rol} </div>
          </div>
        </>
      );
    }
  }

  //LISTA CATEGORIAS
  const locale = {
    noResultsText: "No existen resultados",
    placeholder: "",
    searchPlaceholder: "Buscar...",
    checkAll: "",
  };

  const [activeCategoria, setActiveCategoria] = useState('');

  const handleChangeCategoria = (e) => {
    setActiveCategoria(e);
  }

  if (listacategorias != null && listacategorias.data != "") {
    var mapListaCategorias = [];
    const lc = listacategorias.data;
    for (var i = 0; i < lc.length; i++) {
      mapListaCategorias.push({
        value: lc[i].id,
        label: lc[i].nombre,
      });
    }
  }

  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const dataUsuarios = {
      page: activePage,
      busqueda: ''
    }
    dispatch(getListUser(dataUsuarios));
  }, [])


  return (
    <>
      <animated.div style={fadeOut}>
        <div className='container-entradas'>
          <div className='container-tittle'>
            <h2>Usuarios</h2>
          </div>

          <div className="child-container-filtros-general-usuarios">
            <div className="container-filter-left">
              <div>
                <Link className="button-green-editor" to="/panel-user/crear-usuario">Nuevo usuario</Link>
              </div>
              <div>
                {/* <SelectPicker className="select-style" onChange={(value, e) => handleChangeCategoria(value)} onClean={(value, e) => handleChangeCategoria("")}
                placeholder={"Seleccione una categoria"} data={mapListaCategorias} locale={locale} /> */}
              </div>
            </div>
            <div className="container-filter-right">
              {/* <input type="search" className="search-style" value={busqueda.dataBase} name="dataBase" placeholder='Buscar...' onChange={handleChangeBuscador} /> */}
              <Pagination
                prev
                last
                next
                first
                size="md"
                total={listaUsuarios != null ? listaUsuarios.totalRegisters : ""}
                limit={15}
                activePage={activePage}
                onChangePage={setActivePage}
                maxButtons={1}
                ellipsis={true}
                boundaryLinks={true}
              />
            </div>
          </div>
          <div className="container-user">
            <div className="table-header">
              {/* <div className="header-check">

            </div> */}
              <div className="navbar-header"> Id </div>
              <div className="navbar-header"> Nombre </div>
              <div className="navbar-header"> Email </div>
              <div className="navbar-header"> Entradas </div>
              <div className="navbar-header"> Perfil </div>
            </div>
            {arrayListaPost}
          </div>
        </div>
      </animated.div>
    </>
  )
}
