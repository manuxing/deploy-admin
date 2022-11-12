import React from 'react'
import { NavLink } from 'react-router-dom'
import ReviewC from '../../lO/reviewC'
import ActivityC from "../../lO/activityC";
import FaceIcon from '@mui/icons-material/Face';

function DetalleCliente({actual}) {
  return (
    <div className='actdetail'>
      <div className="div_act">
          <FaceIcon size={"large"}/>
            <div className='div_info'>
              <div>
                <h3>{actual?.name ? actual?.name : "name"}</h3>
              </div>
            </div>
          </div>
            <div className="div_act">
              <div className='div_info'>
                <div>
                  <h3>Contactos</h3>
                </div>
              <div>
                {
                  actual?.contact ? actual?.contact.map(p => { 
                    return (
                      <span key={p}>{p}</span> 
                    ) 
                  }) : "contacto"
                }
              </div>
            </div>
            <div className='div_info'>
              <div>
                <h3 className="span_cli">
                  Actividades realizadas
                </h3>
              </div>
              <div>
                {actual?.activities && actual?.activities.length} 
                  {
                    actual?.activities ? actual?.activities.map(p => { 
                      return (
                        <NavLink key={`${p.id}`} className="link" to={`/activity/${p.id}`}>
                          <ActivityC key={p.id} activity={p}/>
                        </NavLink>
                      ) 
                    }) : "actividades realizadas"
                  }
              </div>
                </div>
              </div>
            <div className="div_act">
              <div className='div_info'>
                <div>
                  <h3>Reviews</h3>
                </div>
                </div>
                <div className='div_info'>
                {
                  actual?.reviews ? actual?.reviews.map(p => { 
                    return (
                      <NavLink key={`${p.id}`} className="link" to={`/review/${p.id}`}>
                        <ReviewC key={p} review = {p}/>
                      </NavLink>
                    ) 
                  }) : "Reviews"
                }
              </div>
            </div>
    </div>
  )
}

export default React.memo(DetalleCliente);