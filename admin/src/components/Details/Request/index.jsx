import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { statChange, setActual,getSolicitudes } from "../../../redux/actions";
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
// import "./Request.css"

// agregar name de cliente aunque no sea cliente a la solicitud
// cambiar estado

const Request = () => {

  const {idR} = useParams();
  const dispatch = useDispatch();
  const actual = useSelector((state) => state.actual);
  console.log(actual)
  const [_stat, setStat] = useState(actual.stat);
  let [loading, setLoading] = useState(true);

    useEffect(()=>{
      console.log("act",actual)
      dispatch(getSolicitudes(idR))
    },[dispatch])
    
    useEffect(()=>{
        if(typeof actual !== "number"){
            setStat(actual.stat)
            setLoading(false)
        }else{
          setLoading(true)
        }
    },[loading,actual])

    useEffect(() => {
      return () => dispatch(setActual())
    }, []);

  const handleChange = () => {  
    console.log(idR)
    let x = {
      type : "Request",
      pack: {
        id: parseInt(idR),
        stat: !_stat,
      }
    }
    console.log("x",x)
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
          {/* <div className="item_requestD">
            <span className="span_request">
              Solicitante
            </span>
                  {actual?.name ? actual?.name : "name"}
          </div> */}
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
                      <span key={p.name}>{p.name}</span>
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
                  actual?.contact ? actual?.contact : "contact"
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

