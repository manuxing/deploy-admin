import React from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../../redux/actions'
import "./base.css"

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
      <div className="paginado">
          {cas.map(p => {
            return(
                <button key={p} onClick={(e)=>handleClick(e, p)}><span>{p}
                    </span></button>
            )
          })}
      </div>
  )
}

export default React.memo(Paginado);