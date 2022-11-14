import React from 'react'
import { NavLink } from 'react-router-dom';

function DetalleService({actual}) {
  return (
<div className='actdetail'>
      <div className="div_act">
        <div className='div_info'>
          <div>
            <h3>{actual?.name ? actual?.name : "name"}</h3>
          </div>
        </div>
        <div className='div_info'>
          <div>
            <h3>Horarios</h3>
          </div>
          <div>
            {actual?.tR ? actual?.tR : "Desde"}
          </div>
          <div>
            {actual?.tR_ ? actual?.tR_ : "Hasta"}
          </div>
        </div>
      </div>
      <div className="div_act">
        <div className='div_info'>
          <div>
            <h3>Descripcion</h3>
          </div>
          <div>{actual?.description ? actual?.description : "descripcion"}</div>
        </div>
      </div>
      <div className="div_act">
        <div className='div_info'>
          <div>
            <h3>Reseñas</h3>
            {actual?.reviews && actual?.reviews.length}
          </div>
          <div>
            {/* {actual.reviews?.length > 0
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
              : ""} */}
          </div>
        </div>
        <div className='div_info'>
          <div>
            <h3>Request</h3>
            {actual?.request && actual?.request.length}
          </div>
          <div>
          {/* {actual?.requests?.length > 0
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
              : ""} */}
              </div>
        </div>
      </div>
      </div>
  );
}

export default React.memo(DetalleService)