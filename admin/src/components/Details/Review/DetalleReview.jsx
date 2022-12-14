import React from 'react'
import { NavLink } from 'react-router-dom'

function DetalleReview({actual, handleChange, _stat}) {
  return (
    <div className='reqdetail'>
        <div className='div_act'>
        <div className='div_info'>
            <div>
              <h3>Cliente:</h3>
              {actual?.de ? 
              <NavLink className="link" to={`/client/${actual?.client.id}`}>
                {actual.de[0].toUpperCase() + actual.de.substring(1) }
              </NavLink>
              :
              <NavLink className="link" to={`/client/${actual?.client.id}`}>
                {actual.client.name[0].toUpperCase() + actual.client.name.substring(1) }
              </NavLink>}
            </div>
        </div>
        <div className='div_info'>
          <div>
            <h3>Servicio</h3>
          </div>
          <div>
          <span >{
           actual?.service && 
           <span >{actual.service.name}</span> 
            }</span>
            </div>
        </div>
      </div>
      <div className="div_act">
        <div className="div_info">
          <div>
            <h3>Fecha de la reseña</h3>
          </div>
          <div>
            {actual?.dateP}
          </div>
        </div>
        <div className="div_info">
          <div>
            <h3>Fecha de la actividad</h3>
          </div>
          <div>
            {actual?.dateR}
          </div>
        </div>
      </div>
      <div className="div_act">
        <div className="div_info">
          <div>
            <h3>Medio</h3>
          </div>
          <div>
        {actual?.thg}
          </div>
        </div>
        <div className="div_info">
          <div>
              <h3>Estado:</h3>
            </div>
          <div>
          {_stat === true ? "Leida" : "Por ver"}
          </div>
        </div>
      </div>
      <div className='des'>
          <div>
            <h3>Descripcion</h3>
            <p>
            {actual?.description ? actual?.description : "description"}
              </p>
          </div>
      </div>
    </div>
  );
}

export default React.memo(DetalleReview);