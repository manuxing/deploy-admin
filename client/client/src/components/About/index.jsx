import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import { actuallContext } from '../ActualContext';
import Display from './Display';
import axios from "axios"
import Spinner from '../Spinner/Spinner';

const About = ()=> {
    let [about, setAbout] = useState(null)
    let history = useHistory();
    useEffect(()=>{
        axios
            .get(` ${process.env.REACT_APP_API_URL}about`)
            .then((res) =>  {
              let cont = JSON.stringify(res.data.contact);
              res.data.contact = JSON.parse(cont)
                setAbout(res.data);
            })
            .catch((e) => {
                history.push("/error")
            });
    },[])
  return (
    <div>
          {about === null ? 
        <Spinner/> :
        <div className="content_act">
          <actuallContext.Provider value={about}>
              <Display/>
          </actuallContext.Provider>
        </div>
        }
    </div>
  );
}

export default About;