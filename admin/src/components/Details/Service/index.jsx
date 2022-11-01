import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from "react-router-dom"
import { getServicio, clearAll } from '../../../redux/actions'
import Spinner from '../../Spinner'
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./Service.css"

const Service = () => {

  const {id} = useParams();
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [Reviews, setReviews] = useState([]);
  let [Requests, setRequests] = useState([]);
  let actual = useSelector((state) => state.actual);

  useEffect(()=>{
    dispatch(getServicio(id))
  },[dispatch])

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
    <div>
      <NavBar/>
      <div className="service_d">
        <SideBar/>
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
      </div>
    </div>
  );
};

export default Service;

