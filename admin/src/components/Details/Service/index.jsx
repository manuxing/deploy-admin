import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink, useHistory } from "react-router-dom"
import { getServicio, getReviews, clearAll } from '../../../redux/actions'
import Spinner from '../../Spinner'
import "./Service.css"

const Service = () => {

  const {id} = useParams();
  let dispatch = useDispatch();
  const history = useHistory();
  let [loading, setLoading] = useState(true);
  let [Reviews, setReviews] = useState([]);
  let [Requests, setRequests] = useState([]);
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);

  useEffect(()=>{
    console.log(error);
    if(error){
      history.push("/err");
    } else{
      dispatch(getReviews())
      dispatch(getServicio(id))
    }
  },[dispatch, error]);

  useEffect(()=>{
    if(typeof actual !== "number"){
      if(actual.reviews !== undefined)setReviews(actual.reviews);
      if(actual.requests !== undefined)setRequests(actual.requests);
      setLoading(false)
    }else{
      setLoading(true)
    }
  },[loading, actual])

  useEffect(() => {
    return () => dispatch(clearAll())
  }, []);
   
  return (
    loading === true ?
    <div>
      <Spinner/>
    </div> 
    :
        <div className="content_srv">
          <div className="div_srv">
            <span className="span_srv">
              imagenes
            </span>
          </div>
          <div className="div_srv">
            <span className="span_srv">
              {actual?.name ? actual?.name : "name"}
            </span>
          </div>
          <div className="div_srv">
            <span className="span_srv">
              Descripcion
            </span>
            <div>
              {actual?.description ? actual?.description : "descripcion"}
            </div>
          </div>
          <div className="div_srv">
            <h2>
              Horarios
            </h2>
            <div>
              <span className="span_srv">Desde</span>
              {actual?.tR ? actual?.tR : "Desde"}
            </div>
            <div>
              <span className="span_srv">Hasta</span>
              {actual?.tR_ ? actual?.tR_ : "Hasta"}
            </div>
          </div>
          <div className="div_srv">
            <span className="span_srv">
              Reviews
            </span>
            {Reviews?.length}
            <div>
              {
                Reviews?.length > 0 ? Reviews.map(p => { 
                  return (
                    <NavLink key={`${p.id}`} className="link" to={`/review/${p.id}`}>
                      <div>
                        <p>fecha:{p?.dateP}</p>
                        <p>"{p.description}"</p>
                        <p>{p.stat  === true ? "leida" : "pendiente"}</p>
                      </div>
                    </NavLink>
                  ) 
                }) : ""
              }
            </div>
            <div className="div_srv">
            <span className="span_srv">
              Requests
            </span>
              {Requests.length}
            <div>
              {
                Requests.length > 0 ? Requests.map(p => { 
                  return (
                    <NavLink key={`${p.id}`} className="link" to={`/request/${p.id}`}>
                      <div>
                        <p>fecha Solicitada:{p?.dateR}</p>
                        <p>{p.contact[0]}</p>
                        <p>{p.stat  === true ? "leida" : "pendiente"}</p>
                      </div>
                    </NavLink>
                  ) 
                }) : ""
              }
            </div>
           </div>
          </div>
        </div>
  );
};

export default Service;

