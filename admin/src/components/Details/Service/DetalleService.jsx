import React from 'react'
import { NavLink } from 'react-router-dom';
import ReviewC from '../../lO/reviewC';

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
          <br></br>
          </div>
          <br></br>
          <div className="display_info">
          {actual?.reviews
            ? actual?.reviews.map((p) => {
                return (
                  <NavLink
                    key={`${p.id}`}
                    className="link"
                    to={`/review/${p.id}`}
                  >
                    <ReviewC key={p} review={p} />
                  </NavLink>
                );
              })
            : "Reviews"}
        </div>
        </div>
        <div className='div_info'>
          <div>
            <h3>Request</h3>
            {actual?.requests && actual?.requests.length}
          </div>
          <div className="display_info">
          {actual?.requests?.length > 0
              ? actual.requests.map((p) => {
                  return (
                    <NavLink
                      key={`${p.id}`}
                      className="link"
                      to={`/request/${p.id}`}
                    >
                      <ReviewC key={p} review={p} />
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