import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { getServicio, getReviews, clearAll, getNot } from '../../../redux/actions'
import DetalleService from './DetalleService'
import tools from '../../../tools'
import Spinner from '../../Spinner'
import "./Service.css"

const Service = () => {
  const {id} = useParams();
  let dispatch = useDispatch();
  const history = useHistory();
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      if(parseInt(id) === Number(id)){
        dispatch(getReviews())
        dispatch(getServicio(parseInt(id)));
        dispatch(getNot());
      }else{
        tools.alert_notFound( "Reseña", history, "/reviews/")
      }
    }
    return () => dispatch(clearAll())
  },[dispatch, error]);
   
  return (
    typeof actual !== "object" ?
      <div>
        <Spinner/>
      </div> 
      :
      <div className="content_srv">
        <DetalleService actual={actual}/>
      </div>
  );
};

export default React.memo(Service);

