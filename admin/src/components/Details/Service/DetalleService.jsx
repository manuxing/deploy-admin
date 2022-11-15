import React from 'react'
import { NavLink } from 'react-router-dom';

function DetalleService({actual}) {
  return (
    <div>
      <div className="div_srv">
        <span className="span_srv">imagenes</span>
      </div>
      <div className="div_srv">
        <span className="span_srv">{actual?.name ? actual?.name : "name"}</span>
      </div>
      <div className="div_srv">
        <span className="span_srv">Descripcion</span>
        <div>{actual?.description ? actual?.description : "descripcion"}</div>
      </div>
      <div className="div_srv">
        <h2>Horarios</h2>
        <div>
          <span className="span_srv">Desde</span>
          {actual?.tR ? actual?.tR : "Desde"}
        </div>
        <div>
          <span className="span_srv">Hasta</span>
          {actual?.tR_ ? actual?.tR_ : "Hasta"}
        </div>
      </div>
      <div className="div_srv">
        <span className="span_srv">Reviews</span>
        {actual.reviews?.length}
        <div>
          {actual.reviews?.length > 0
            ? actual.reviews.map((p) => {
                return (
                  <NavLink
                    key={`${p.id}`}
                    className="link"
                    to={`/review/${p.id}`}
                  >
                    <div>
                      <p>fecha:{p?.dateP}</p>
                      <p>"{p.description}"</p>
                      <p>{p.stat === true ? "leida" : "pendiente"}</p>
                    </div>
                  </NavLink>
                );
              })
            : ""}
        </div>
        <div className="div_srv">
          <span className="span_srv">Requests</span>
          {actual?.requests?.length}
          <div>
            {actual?.requests?.length > 0
              ? actual.requests.map((p) => {
                  return (
                    <NavLink
                      key={`${p.id}`}
                      className="link"
                      to={`/request/${p.id}`}
                    >
                      <div>
                        <p>fecha Solicitada:{p?.dateR}</p>
                        <p>{p.contact[0]}</p>
                        <p>{p.stat === true ? "leida" : "pendiente"}</p>
                      </div>
                    </NavLink>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DetalleService)