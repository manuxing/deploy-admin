import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { statChange } from "../../../redux/actions";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./Request.css"

// agregar name de cliente aunque no sea cliente a la solicitud
// cambiar estado

const Request = () => {

  const dispatch = useDispatch();
  const actual = useSelector((state) => state.actual);
  const [_stat, setStat] = useState(actual.stat);
  

  const handleChange = () => {  
    let x = {
      type : "Request ",
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
      <div className="request_d">
        <SideBar/>
        <div className="content_request">
          <div className="item_requestD">
            <span className="span_request">
              Estado:
                {_stat === true ? "Leida" : "Por ver"}
            </span>
              <button onClick={() => handleChange()}>change</button>
          </div>
          <div className="item_requestD">
            <span className="span_request">
              Solicitante
            </span>
                  {actual?.name ? actual?.name : "name"}
          </div>
          <div className="item_requestD">
            <span className="span_request">
              Tipo
            </span>
                  { actual?.ant ? (actual?.ant === false ? "Solcitada" : "Espontanea") : "aticipada"}
          </div>
          <div className="item_requestD">
            <span className="span_request">
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
          <div className="item_requestD">
            <span className="span_request">
              Contactos
            </span>
            <div>
                  {
                  actual?.contact ? actual?.contact.map(p => { 
                    return (
                        <span>{p}</span> 
                    ) 
                  }) : "contact"
                  }
            </div>
          </div>
          <div className="item_requestD">
            <span className="span_request">
              Medio
            </span>
                  {actual?.thg ? actual?.thg : "medio"}
          </div>
          <div className="item_requestD">
            <span className="span_request">
              fecha de solicitud
              </span>
                  {actual?.dateR ? actual?.dateR : "fecha de solicitud"}
          </div>
          <div className="item_requestD">
            <span className="span_request">
              fecha solicitada
              </span>
              {actual?.dateP ? actual?.dateP : "fecha solicitada"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;

