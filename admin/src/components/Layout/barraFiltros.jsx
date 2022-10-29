import React from 'react';
import {orderByN, orderByV} from '../../redux/actions';
import { useDispatch } from 'react-redux';

const BarraFiltros = ({activity}) => {
    
    let dispatch = useDispatch();

  return (
    <div>
        <button onClick={()=>dispatch(orderByV())}>orden valor</button>
        <button onClick={()=> dispatch(orderByN())}>orden alfa</button>         
        {/*selects o cosos de filtros*/}
    </div>
  );
};

export default BarraFiltros;