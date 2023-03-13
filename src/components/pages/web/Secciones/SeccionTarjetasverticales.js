import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

function SeccionTarjetasverticales(props) {
  const listParaPublicacion = props.dataCards;

  const vistaMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <>
      <div className="contenedor-tarjetas-recientes">
        <div className="subbox-tarjetas-recientes-vertical">
          <div className="container-tarjetas-vertical">
            {listParaPublicacion != null && listParaPublicacion != false &&

              listParaPublicacion.map((item, key) => {
                return (
                  <Link
                    className="link-destacadas"
                    to={"/" + item.data.path}
                    onClick={() => {
                      localStorage.setItem(
                        "dataPostNota",
                        JSON.stringify(item.data)
                      );
                    }}
                  >
                    <div className="tarjeta-vertical" key={key}>
                      <div className="foto-tarjeta-vertical">
                        <img
                          alt="foto"
                          src={item.data.pathPortada}
                        />
                      </div>
                      <div className="box-texto-tarjetas-vertical">
                        <div className="container-categoria-tarjeta-vertical">
                          {" "}
                          {item.categoria != null &&
                            item.categoria}
                        </div>
                        <p className="titulo-tarjeta-vertical">
                          {item.data.titulo}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SeccionTarjetasverticales;
