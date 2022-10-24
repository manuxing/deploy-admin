import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner';
import { statChange } from "../../redux/actions";

const ReviewC = ({review}) => {
  const dispatch = useDispatch();
  const [_stat, setStat] = useState(review.stat);
  
  useEffect(()=>{
      console.log("rev",review)
  },[dispatch,review])
  
  const handleChange = () => {
    let x = {
      type : "Review",
      pack: {
        id: review.id,
        stat: !_stat,
      }
    }
    setStat(!_stat);
    dispatch(statChange(x));
  }

  return (
    review && review.id ?
        <div>
          <div  className="content_rewC">
            <div  className="div_rewC">
              <span className="span_rexC">
              fecha de reseña:
              </span>
              {review.dateR}
            </div>
            <div  className="div_rewC">
              <span className="span_rexC">
                fecha de la visita:
              </span>
              {review.dateP}
            </div>
            <div  className="div_rewC">
              <span className="span_rexC">
              Estado:
              </span>
              {_stat === true ? "Leida" : "Por ver"}
              <button onClick={handleChange}>change</button>
            </div>
            <div  className="div_rewC">
              <span className="span_rexC">
              Descripcion:
              </span>
              {review.description}
            </div>
            <div  className="div_rewC">
              <span className="span_rexC">
              Medio:
              </span>
              {review.thg}
            </div>
            <div  className="div_rewC">
              <span className="span_rexC">
              fecha de visita:
              </span>
              {review.dateP}
            </div>
          </div>
        </div>:
      <div>
        <Spinner/>
      </div>
  );
};

export default ReviewC;