import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Activity_d.css";
import FaceIcon from '@mui/icons-material/Face';

function Detalle ({actual}) {
  return (
    <div className='actdetail'>
      <div className="div_act">
        <FaceIcon size={"large"}/>
        <div className='div_info'>
            <div>
              <h3>Cliente:</h3>
            </div>
            <div>
              <NavLink  to={`/client/${actual?.client?.id}`}>
                {actual?.client?.name ? actual?.client?.name : "name"}
              </NavLink>
            </div>
        </div>
      </div>
      <div className="div_act">
        <div className='div_info'>
          <div>
            <h3>Servicios:</h3>
          </div>
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
        <div className='div_info'>
          <div>
            <h3 >fecha de actividad</h3>
          </div>
          <div>
            {actual?.date ? actual?.date : "date"}
          </div>
        </div>
      </div>
      <div className="div_act">
        <div className='div_info'>
          <div>
            <span >Personas:</span>
          </div>
          <div>
            {actual?.persons ? actual?.persons.length : "0"}
          </div>
        </div>
        <div className='div_info'>
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
    </div>
  );
}

export default React.memo(Detalle);