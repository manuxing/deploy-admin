import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAbout, putAbout, errorForm } from "../../redux/actions";
import Form from './Form';
import { actuallContext } from '../create/ActualContext';
import tools from '../../tools/index';
import Spinner from '../Spinner';

const About = () => {
    let about = useSelector(state => state.about);
    let {validate} = tools;
    let dispatch = useDispatch();
  
    let errForm = useSelector((state) => state.errForm);
    let thg = [
      "telefono",
      "email",
      "presencial",
      "pagina",
      "booking",
      "otro",
    ];
  
    let [input, setInput] = useState({
      info: "",
      contact: "",
    });
    let [warning, setWarning] = useState({
        info: "",
        contact: "",
    });
  
    useEffect(() => {
      if(errForm && errForm?.data){
        alert(errForm.data)
        dispatch(errorForm());
      }
    }, [errForm]);
  
    useEffect(() => {
      console.log(about)
      if(about !== null)setInput({id: about.id, info:about.info,
         contact:about.contact});
    }, [about]);

    useEffect(() => {
      dispatch(getAbout())
    }, [dispatch]);
    
    let send = {
      input,
      warning,
      dispatch,
      putAbout,
      setInput,
      setWarning,
      thg
    };
    
    return (
      <div>
        {about === null ? 
        <Spinner/> :
        <div className="content_act">
          Informacion
          <actuallContext.Provider value={send}>
            <Form/>
          </actuallContext.Provider>
        </div>
        }
      </div>
    );
  };
  
  export default React.memo(About);