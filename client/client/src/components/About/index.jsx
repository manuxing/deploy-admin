import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import { actuallContext } from '../ActualContext';
import Display from './Display';
import axios from "axios"

const About = ()=> {
    let [about, setAbout] = useState(null)
    let history = useHistory();
    useEffect(()=>{
        axios
            .get(`http://localhost:3001/about`)
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
        <p>cargando</p> :
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