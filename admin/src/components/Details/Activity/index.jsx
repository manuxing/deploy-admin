import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { getActividades, setActual, getNot } from '../../../redux/actions'
import Spinner from '../../Spinner'
import tools from "../../../tools";
import "./Activity_d.css"
import Detalle from './DetalleActividad'

const Activity = () => {
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
        dispatch(getActividades(parseInt(id)))
        dispatch(getNot());
      }else{
        tools.alert_notFound( "Actividad", history, "/activitys/")
      }
    }
    return () => dispatch(setActual())
  },[dispatch, error]);

  return (
      typeof actual !== "object" ?
          <Spinner/>
        :
              <Detalle actual={actual}/>
    );
};

export default React.memo(Activity);

