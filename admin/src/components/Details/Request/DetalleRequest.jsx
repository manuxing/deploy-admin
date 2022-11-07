import React from 'react'
import { NavLink } from 'react-router-dom'

function DetalleRequest({ actual, handleChange, _stat }) {
  return (
    <div>
      {actual.solicitante && actual?.solicitante.length > 1 && (
        <div className="item_requestD">
          <span className="span_request">Solicitante</span>
          {actual?.solicitante}
        </div>
      )}
      <div className="item_requestD">
        <span className="span_request">Servicios</span>
        <div>
          {actual?.service &&
                  <NavLink
                    key={`${actual.service.id}`}
                    className="link"
                    to={`/service/${actual.service.id}`}
                  >
                    <span>{actual.service.name}</span>
                  </NavLink>
           }
        </div>
      </div>
      <div className="item_requestD">
        <span className="span_request">Contactos</span>
        <div>{actual?.contact}</div>
      </div>
      <div className="item_requestD">
        <span className="span_request">Medio</span>
        {actual?.thg}
      </div>
      <div className="item_requestD">
        <span className="span_request">fecha de solicitud</span>
        {actual?.dateR}
      </div>
      <div className="item_requestD">
        <span className="span_request">fecha solicitada</span>
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

export default React.memo(DetalleRequest);