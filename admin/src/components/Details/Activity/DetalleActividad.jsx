import React from 'react'
import { NavLink } from 'react-router-dom';

function Detalle ({actual}) {

  return (
    <div>
      <div className="div_act">
        <span className="_span_act">Cliente:</span>
        <NavLink className="link" to={`/client/${actual?.client?.id}`}>
          {actual?.client?.name ? actual?.client?.name : "name"}
        </NavLink>
      </div>
      <div className="div_act">
        <span className="_span_act">Servicios</span>
        <div className='map'>
          {actual?.services
            ? actual.services.map((p) => {
                return (
                  <NavLink
                    key={p.name}
                    className="link"
                    to={`/service/${p.id}`}
                  >
                    <span>{p.name}</span>
                  </NavLink>
                );
              })
            : "services"}
        </div>
      </div>
      <div className="div_act">
        <span className="_span_act">fecha de actividad</span>
        {actual?.date ? actual?.date : "date"}
      </div>
      <div className="div_act">
        <span className="_span_act">Personas:</span>
        {actual?.persons ? actual?.persons.length : "0"}
        <div className="map">
          <ul>
            {actual?.persons
              ? actual?.persons.map((p) => {
                  return (
                    <li key={p}>
                      <span>- {p}</span>
                    </li>
                  );
                })
              : "persons"}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Detalle);