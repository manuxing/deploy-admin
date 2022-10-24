import React ,{useState}from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Agregar = (Component, type) => {
    let [pressed, setP] = useState(false);
    let todos = useSelector(state => state.type);
    useEffect(()=>{
      setP(false);
    },[todos])
  return (
    <div>{
        pressed === false ? 
      <button onClick={()=>setP(true)}>
        {/* <img src={icon} alt="agregar"></img> */}
        agregar
      </button>:
        < Component setP/>
    }
    </div>
  );
};

export default Agregar;
