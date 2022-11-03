import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams, NavLink, useHistory} from "react-router-dom"
import { getClient, getActividades, setActual, getNot } from '../../../redux/actions'
import tools from '../../../tools'
import Spinner from '../../Spinner'
import "./client.css"
import DetalleCliente from './DetalleCliente'

const Cliente = () => {
  const {id} = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      dispatch(getNot());
      if(parseInt(id) === Number(id)){
        dispatch(getClient(parseInt(id)))
        dispatch(getActividades())
        dispatch(getNot());
      }else{
        tools.alert_notFound( "Cliente", history, "/clients/")
      }
    }
    return () => dispatch(setActual())
  },[dispatch, error]);

  return (
    typeof actual !== "object" ?
      <div>
        <Spinner/>
      </div> 
      :
          <div className="content_cli">
            <DetalleCliente actual={actual}/>
          </div>
    );
};

export default React.memo(Cliente);

