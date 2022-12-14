import React from 'react'
import { NavLink } from 'react-router-dom'
import ReviewC from '../../lO/reviewC'
import ActivityC from "../../lO/activityC";

function DetalleCliente({actual}) {
  return (
    <div className="actdetail">
      <div className="div_act">
        <div className="div_info">
          <div>
            <h3>{actual?.name ? actual.name[0].toUpperCase() + actual.name.substring(1) : "name"}</h3>
          </div>
        </div>
        <div className="div_info">
          <div>
            <h3>Contactos</h3>
          </div>
          <div>
            {actual?.contact
              ? actual?.contact.map((p) => {
                  return <span key={p}>{p}</span>;
                })
              : "contacto"}
          </div>
        </div>
      </div>
      <div className="div_act">
        <div className="div_info">
          <div>
            <h3 className="span_cli">
              Actividades realizadas{" "}
              {actual?.activities && actual?.activities.length}
            </h3>
          </div>
          <br></br>
          <div className="display_info">
            {actual?.activities
              ? actual?.activities.map((p) => {
                  return (
                    <NavLink
                      key={`${p.id}`}
                      className="link"
                      to={`/activity/${p.id}`}
                    >
                      <ActivityC key={p.id} activity={p} />
                    </NavLink>
                  );
                })
              : "actividades realizadas"}
          </div>
        </div>
        <div className="div_info">
          <div>
            <h3>Reviews {actual?.reviews && actual?.reviews.length}</h3>
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
      </div>
    </div>
  );
}

export default React.memo(DetalleCliente);