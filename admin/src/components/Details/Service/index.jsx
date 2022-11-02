import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink, useHistory } from "react-router-dom"
import { getServicio, getReviews, clearAll } from '../../../redux/actions'
import Spinner from '../../Spinner'
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./Service.css"

const Service = () => {

  const {id} = useParams();
  let dispatch = useDispatch();
  const history = useHistory();
  let [loading, setLoading] = useState(true);
  let [loadingR, setLoadingR] = useState(true);
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);
  let reviews = useSelector((state) => state.reviews);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      dispatch(getReviews())
      dispatch(getServicio(id))
    }
  },[dispatch, error]);

  useEffect(()=>{
    if(typeof actual !== "number"){
      setLoading(false)
      if(reviews.length > 0){
        reviews = reviews.filter(p =>{
          if(p.services.length > 0){
            if(p.services[0].id === actual.id){
              return p;
            }
          }
        });
        reviews.length > 0 ? setLoadingR(false) : setLoadingR(true)
      }
    }else{
      setLoading(true)
    }
  },[loading, actual, reviews])

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
            <span className="span_srv">
              Horarios
            </span>
            <div>
              {actual?.tR ? actual?.tR : "rango Horario"}
            </div>
          </div>
          {loadingR === true ? <></>
          :
          <div className="div_srv">
            <span className="span_srv">
              Reviews
            </span>
            {reviews.length}
            <div>
              {
                reviews ? reviews.map(p => { 
                  return (
                    <NavLink key={`${p.id}`} className="link" to={`/review/${p.id}`}>
                      <div>
                        {p?.clients[0]?.name}:
                        "{p.description}"
                      </div>
                    </NavLink>
                  ) 
                }) : "Reviews"
              }
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Service;

