import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from "react-router-dom"
import { getServicio, getReviews, clear } from '../../../redux/actions'
import Spinner from '../../Spinner'
import NavBar from "../../bars/navBar";
import SideBar from "../../bars/sideBar";
import "./Service.css"

const Service = () => {

  const {id} = useParams();
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [loadingR, setLoadingR] = useState(true);
  let actual = useSelector((state) => state.actual);
  let reviews = useSelector((state) => state.reviews);

    useEffect(()=>{
        dispatch(getReviews())
        dispatch(getServicio(id))
    },[dispatch])

    useEffect(()=>{
      if(typeof actual !== "number"){
        setLoading(false)
      }else{
        setLoading(true)
      }
      if(reviews.length > 0){
        reviews = reviews.filter(p => parseInt(p.services[0].id) === parseInt(id));
        reviews.length > 0 ? setLoadingR(false) : setLoadingR(true)
      }
    },[loading, actual, reviews])

    useEffect(() => {
      return () => dispatch(clear())
    }, []);
   
  return (
     loading === true ?
    <div>
      <Spinner/>
    </div> :
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
                  {
                  actual?.description ? actual?.description : "contacto"
                  }
            </div>
          </div>
          <div className="div_srv">
          <span className="span_srv">
              Horarios
            </span>
            <div>
                  {actual?.tR ? actual?.description : "descricion"}
            </div>
          </div>
          { loadingR === true ? <></>:
            <div className="div_srv">
              <span className="span_srv">
                Reviews
              </span>
              {reviews.length}
              <div>
                    {
                      reviews ? reviews.map(p => { 
                        return (
                          <NavLink  className="link" to={`/review/${p.id}`}>
                            {p.clients[0].name}:
                            {/* {p.rat} */}
                            "{p.description}"
                          </NavLink>
                        ) 
                      }) : "Reviews"
                    }
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Service;

