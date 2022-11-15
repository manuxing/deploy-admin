import React from 'react'
import { NavLink } from 'react-router-dom'
import ReviewC from '../../lO/reviewC'
import ActivityC from "../../lO/activityC";

function DetalleCliente({actual}) {
  return (
    <div>
             <div className="div_cli">
              <span className="span_cli">
                {actual?.name ? actual?.name : "name"}
              </span>
            </div>
            <div className="div_cli">
              <span className="span_cli">
                Contactos
              </span>
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
            <div className="div_cli">
              <span className="span_cli">
                Actividades realizadas
              </span>
              <div>
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
            <div className="div_cli">
              <span className="span_cli">
                Reviews
              </span>
              <div>
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