import React from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../../redux/actions'

const Paginado = ({values}) =>{
    let dispatch = useDispatch();

    let arr = ()=>{
        let array = []
        for(let i = 0; i < values.totalPages; i++){
            array.push(i)
        }
        return array;
    }
    let cas = arr();
    let handleClick = (e, p)=>{
        e.preventDefault();
        dispatch(changePage(p, values.model));
    }
    
  return (
      <div>
      <span>sosppaap</span>
          {cas.map(p => {
            return(
                <button onClick={(e)=>handleClick(e, p)}>{p}</button>
            )
          })}
      </div>
  )
}

export default React.memo(Paginado);