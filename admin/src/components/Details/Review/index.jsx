import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { statChange } from "../../../redux/actions";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./review.css"

// agregar name de cliente aunque no sea cliente a la solicitud

const Review = () => {

  const dispatch = useDispatch();
  const actual = useSelector((state) => state.actual);
  const [_stat, setStat] = useState(actual.stat);
  const client = actual?.clients;//[0]
  

  const handleChange = () => {
    let x = {
      type : "Review",
      pack: {
        id: actual.id,
        stat: !_stat,
      }
    }
    setStat(!_stat);
    dispatch(statChange(x));
  }

  return (
    <div>
      <NavBar/>
      <div className="review_d">
        <SideBar/>
        <div className="content_Review">
          <div  className="div_rev">
            <span className="span_rev">
              Cliente
            </span>
                  {client?.name ? client?.name : "name"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              Descripcion
            </span>
                  {actual?.description ? actual?.description : "description"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
                Servicios
            </span>
            <div>
                  {
                    actual?.services ? actual?.services.map(p => { 
                      return (
                      <span>{p.name}</span>
                    ) 
                  }) : "services"
                  }
            </div>
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              Medio
            </span>
            {actual?.thg ? actual?.thg : "medio"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              Contacto
            </span>
            <div>
                  {
                    client?.contact ? client?.contact.map(p => { 
                      return (
                      <span>{p}</span>
                    ) 
                  }) : "contacto"
                  }
            </div>
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              fecha de actividad
              </span>
                  {actual?.dateR ? actual?.dateR : "fecha de actividad"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              fecha de reseña
              </span>
                  {actual?.dateP ? actual.dateP : "fecha de reseña"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

