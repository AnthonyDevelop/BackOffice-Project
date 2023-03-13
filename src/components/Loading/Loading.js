import React from 'react'
import "./loading.css"

export default function Loading() {
  return (
    <div className="loading-conteiner">
        <p className="text-publicando" style={{color:'#55be3d'}}>Cargando Noticias</p>
        <span class="loader"></span>
     </div>
  )
}
