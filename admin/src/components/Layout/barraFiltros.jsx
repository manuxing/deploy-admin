import React,  { useState }  from 'react';
import {search} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const BarraFiltros = () => {
    let [order, setOrder] = useState("DESC");
    let dispatch = useDispatch();
    let actual = useSelector(state => state.actualG)
    let handleClick= (e)=>{
      e.preventDefault();
      dispatch(search( actual.search === undefined ? "" : actual.search, actual.model, actual.currentPage, order))
      if(order === "ASC"){
        setOrder("DESC")
      }else{
        setOrder("ASC");
      }
    }
  return (
    <div>
        <button onClick={(e)=>handleClick(e)}>orden {order ===false ? "asc" : "desc"}</button>         
    </div>
  );
};

export default React.memo(BarraFiltros);