import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams, useHistory } from "react-router-dom"
import { getActividades,setActual } from '../../../redux/actions'
import Spinner from '../../Spinner'
import "./Activity_d.css"

const Activity = () => {

  const {id} = useParams();
  let dispatch = useDispatch();
  const history = useHistory();
  let [loading, setLoading] = useState(true);
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);

  useEffect(()=>{
    console.log(error);
    if(error){
      history.push("/err");
    } else{
      dispatch(getActividades(id))
    }
  },[dispatch, error]);

  useEffect(()=>{
    if(typeof actual !== "number"){
      setLoading(false);
    }else{
      setLoading(true)
    }
  },[loading,actual]);

  useEffect(() => {
    return () => dispatch(setActual())
  }, []);

  return (
    loading === true ?
        <div>
          <Spinner/>
        </div> 
        :
            <div className="content_act">
              <div  className="div_act">
                <span className="_span_act">
                  Cliente:
                </span>
                <NavLink  className="link" to={`/client/${actual?.client?.id}`}>
                  {actual?.client?.name ? actual?.client?.name : "name"}
                </NavLink>
              </div>
              <div  className="div_act">
                <span className="_span_act">
                  Servicios
                </span>
                <div>
                  {
                    actual?.services ? actual.services.map(p => { 
                      return (
                        <NavLink key={p.name} className="link" to={`/service/${p.id}`}>
                          <span >{p.name}</span>
                        </NavLink>
                      ) 
                    }) : "services"
                  }
                </div>
              </div>  
              <div  className="div_act">
                <span className="_span_act">
                  fecha de actividad
                </span>
                  {actual?.date ? actual?.date : "date"}
              </div>
              <div  className="div_act">
                <span className="_span_act">
                  Personas:
                </span>
                {actual?.persons ? actual?.persons.length : "0"}
                <div>
                  <ul>
                    {
                    actual?.persons ? actual?.persons.map(p => { 
                      return (
                        <li key={p}>
                          <span>-  {p}</span> 
                        </li>
                      ) 
                    }) : "persons"
                    }
                  </ul>
                </div>
              </div>
            </div>
    );
};

export default Activity;

