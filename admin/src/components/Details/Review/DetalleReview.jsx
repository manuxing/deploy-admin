import React from 'react'
import { NavLink } from 'react-router-dom'

function DetalleReview({actual, handleChange, _stat}) {
  return (
    <div>
        <div className="div_rev">
          <span className="span_rev">Cliente</span>
          <NavLink className="link" to={`/client/${actual?.clients[0].id}`}>
            {actual?.clients[0].name ? actual?.clients[0].name : "name"}
          </NavLink>
        </div>
      <div className="div_rev">
        <span className="span_rev">Descripcion</span>
        {actual?.description ? actual?.description : "description"}
      </div>
      <div className="div_rev">
        <span className="span_rev">Servicios</span>
        <div>
          {actual?.services.map((p) => {
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
      <div className="div_rev">
        <span className="span_rev">Medio</span>
        {actual?.thg}
      </div>
      <div className="div_rev">
        <span className="span_rev">fecha de actividad</span>
        {actual?.dateR}
      </div>
      <div className="div_rev">
        <span className="span_rev">fecha de reseña</span>
        {actual?.dateP}
      </div>
      <div className="item_requestD">
        <span className="span_request">
          Estado:
          {_stat === true ? "Leida" : "Por ver"}
        </span>
        <button onClick={() => handleChange()}>change</button>
      </div>
    </div>
  );
}

export default React.memo(DetalleReview);