import React from 'react'
import { NavLink } from 'react-router-dom'

function DetalleReview({actual, handleChange, _stat}) {
  return (
    <div className='reqdetail'>
        <div className='div_act'>
        <div className='div_info'>
          {actual.client && (
            <div>
              <h3>Cliente:</h3>
              {actual.client && 
            <NavLink className="link" to={`/client/${actual?.client.id}`}>
              {actual?.client.name}
            </NavLink>}
            </div>
          )}
        </div>
        <div className='div_info'>
          <div>
            <h3>Servicios</h3>
          </div>
          <div>
          {actual?.services && actual?.services.map((p) => {
                return (
                  <NavLink
                    key={`${p.id}`}
                    className="link"
                    to={`/service/${p.id}`}
                  >
                    <span key={p.name}>{p.name}</span>
                  </NavLink>
              );
            })}
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
        <button onClick={() => handleChange()}>change</button>
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