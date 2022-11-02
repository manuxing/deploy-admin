import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams, NavLink, useHistory} from "react-router-dom"
import { getClient, getActividades, setActual } from '../../../redux/actions'
import Spinner from '../../Spinner'
import ReviewC from "../../lO/reviewC"
import ActivityC from "../../lO/activityC"
import "./client.css"

const Cliente = () => {

  const {id} = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  let [loading, setLoading] = useState(true);
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);

  useEffect(()=>{
    console.log(error);
    if(error){
      history.push("/err");
    } else{
      dispatch(getActividades())
      
      if(!parseInt(id).toString().length !== id.length){
        dispatch(getClient(id))
      }
    }
  },[dispatch, error]);

  useEffect(()=>{
    if(typeof actual !== "number"){
      setLoading(false)
    }else{
      setLoading(true)
    }
  },[loading,actual])

  useEffect(() => {
    return () => dispatch(setActual())
  }, []);

  return (
    loading === true ?
      <div>
        <Spinner/>
      </div> 
      :
          <div className="content_cli">
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
    );
};

export default Cliente;

