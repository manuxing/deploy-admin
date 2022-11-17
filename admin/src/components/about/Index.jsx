import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAbout, putAbout, errorForm } from "../../redux/actions";
import Form from './Form';
import { actuallContext } from '../create/ActualContext';
import Spinner from '../Spinner';

const About = () => {
    let about = useSelector(state => state.about);
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
      servicios: [],
    });
    let [warning, setWarning] = useState({
        info: "",
        servicio: "",
        contact: "",
    });
  
    useEffect(() => {
      if(errForm && errForm?.data){
        alert(errForm.data)
        dispatch(errorForm());
      }
    }, [errForm]);
  
    useEffect(() => {
      if(about !== null){
        if(typeof about.servicios === "string"){
          let serv = JSON.stringify(about.servicios);
          serv = JSON.parse(serv)
          let cont = JSON.stringify(about.contact);
          cont = JSON.parse(cont)
          setInput({id: about.id, info:about.info,  servicios:JSON.parse(serv),
          contact:JSON.parse(cont)});
        }else{
          setInput({id: about.id, info:about.info,  servicios:about.servicios,
            contact:about.contact});

        }
      }}, [about]);

        
    useEffect(() => {
      console.log(input.servicios);
      }, [input]);


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
          <h3>
            Informacion
          </h3>
          <actuallContext.Provider value={send}>
            <Form/>
          </actuallContext.Provider>
        </div>
        }
      </div>
    );
  };
  
  export default React.memo(About);