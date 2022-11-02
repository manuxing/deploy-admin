import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { statChange, setActual,getSolicitudes } from "../../../redux/actions";

const Request = () => {

  const {idR} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const actual = useSelector((state) => state.actual);
  const error = useSelector((state) => state.error);
  const [_stat, setStat] = useState(actual.stat);
  let [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      dispatch(getSolicitudes(idR))
    }
  },[dispatch, error]);
    
  useEffect(()=>{
    if(actual && actual !== 1 && actual?.stat !== null){
      if(actual.stat === false){
        dispatch(statChange({
          type : "Request",
          pack: {
            id: parseInt(idR),
            stat: !actual.stat,
          }
        }));
        setStat(!actual?.stat);
      } else {
        setStat(actual?.stat);
      }
      setLoading(false);
    }else{
      setLoading(true)
    }
  },[loading,actual])

  useEffect(() => {
    return () => dispatch(setActual())
  }, []);

  const handleChange = () => {  
    let x = {
      type : "Request",
      pack: {
        id: parseInt(idR),
        stat: !_stat,
      }
    }
    setStat(!_stat);
    dispatch(statChange(x));
  }

  return (
    //poner spinner
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
  );
};

export default Request;

