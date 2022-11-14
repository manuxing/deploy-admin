import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { getServicio, errorForm, updateServicio, getReviews, getNot, setActual } from '../../../redux/actions'
import Form from './Form'
import DetalleService from './DetalleService'
import tools from '../../../tools'
import Spinner from '../../Spinner'
import { actuallContext } from '../../create/ActualContext';
import "./Service.css"

const Service = () => {
  const {id} = useParams();
  let dispatch = useDispatch();
  let validate = tools.validate
  const history = useHistory();
  let actual = useSelector((state) => state.actual);
  let error = useSelector((state) => state.error);
  let errForm = useSelector((state) => state.errForm);
  let [edit, setEdit] = useState(false);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      if(parseInt(id) === Number(id)){
        dispatch(getServicio(parseInt(id)));
        dispatch(getNot());
      }else{
        tools.alert_notFound( "Reseña", history, "/reviews/")
      }
    }
    return () => dispatch(setActual())
  },[dispatch, error]);
   
  let [input, setInput] = useState({
    name: "",
    description: "",
    tR: "",
    _tR: "",
  });
  let [warning, setWarning] = useState({
    name: "",
    description: "",
    tR: "",
    _tR: "",
  });

  useEffect(() => {
    if(errForm && errForm?.data){
      alert(errForm.data)
      dispatch(errorForm());
    }
  }, [errForm]);

  useEffect(() => {
    if(actual !== null)setInput({id: actual.id, name:actual.name,
       description:actual.description, tR:actual.tR, tR_:actual.tR_});
    if(actual && actual.updated){
      alert("updated");
      setEdit(false)
    }
  }, [actual]);

  let send = {
    input,
    warning,
    dispatch,
    validate,
    updateServicio,
    setInput,
    setWarning,
  };

  let editS = (e) =>{
    e.preventDefault();
    setEdit(!edit);
  }

  return (
    typeof actual !== "object" ?
      <div>
        <Spinner/>
      </div> 
      :
      <div className="content_srv">{
        edit === false ?
        <DetalleService actual={actual}/> :
        <actuallContext.Provider value={send}>
            <Form/>
          </actuallContext.Provider>
      }
        <button onClick={(e)=>editS(e)}> edit </button>
      </div>
  );
};

export default React.memo(Service);

