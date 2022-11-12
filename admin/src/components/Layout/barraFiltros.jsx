import React,  { useState }  from 'react';
import {search} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
      order === "DESC" ? 
      <button onClick={(e)=>handleClick(e)}><ArrowDownwardIcon/></button>         :
      <button onClick={(e)=>handleClick(e)}><ArrowUpwardIcon/></button>         
  );
};

export default React.memo(BarraFiltros);