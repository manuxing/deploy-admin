import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { statChange, setActual, getSolicitudes, getNot } from "../../../redux/actions";
import tools from '../../../tools';
import Spinner from '../../Spinner'
import DetalleRequest from './DetalleRequest';

const Request = () => {
  const {idR} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const actual = useSelector((state) => state.actual);
  const error = useSelector((state) => state.error);
  const [_stat, setStat] = useState(true);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      if(parseInt(idR) === Number(idR)){
        dispatch(getSolicitudes(idR))
        dispatch(getNot());
      }else{
        tools.alert_notFound( "Solicitud", history, "/requests/")
      }
    }
    return () => dispatch(setActual())
  },[dispatch, error]);
    
  useEffect(()=>{
    if(actual && actual !== 1 && actual?.stat !== null){
      if(actual.stat === false){
        handleChange(true);
      } else {
        setStat(actual?.stat);
      }
    }
  },[actual])

  const handleChange = (val) => {  
    let x = {
      type : "Request",
      pack: {
        id: parseInt(idR),
        stat: val,
      }
    }
    setStat(val);
    dispatch(statChange(x));
  }

  return (
    typeof actual !== "object" ?
        <div>
          <Spinner/>
        </div> 
        :
        <div className="content_request">
          <DetalleRequest actual={actual} handleChange={handleChange} _stat={_stat} />
        </div>
  );
};

export default React.memo(Request);