import React from 'react'
import { NavLink } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face';
import "./Request.css"

function DetalleRequest({ actual, handleChange, _stat }) {
  return (
    <div className='reqdetail'>
      <div className='div_act'>
        <div className='div_info'>
          {actual.solicitante && actual?.solicitante.length > 1 && (
            <div>
              <h3 className="span_request">Solicitante:</h3>
              {actual?.solicitante}
            </div>
          )}
        </div>
        <div className='div_info'>
          <div>
            <h3>Servicios</h3>
          </div>
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
      </div>
      <div className="div_act">
      <div className="div_info">
        <div>
          <h3>Fecha solicitada</h3>
        </div>
        <div>
          {actual?.dateP}
        </div>
      </div>
        <div className="div_info">
          <div>
            <h3 className="span_request">Fecha de solicitud</h3>
          </div>
          <div>
            {actual?.dateR}
          </div>
        </div>
      </div>
      <div className='div_act'>
        <div className="div_info">
          <div>
            <h3>Contactos</h3>
          </div>
          <div>{actual?.contact}</div>
        </div>
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
          {/* <br></br> <button onClick={() => handleChange(!_stat)}>change</button> */}
          </div>
        </div>
        </div>
      </div>
  );
}

export default React.memo(DetalleRequest);