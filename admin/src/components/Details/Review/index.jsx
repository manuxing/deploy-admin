import React, {useState, useEffect} from "react";
import { useParams,  useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, statChange, setActual, getNot } from "../../../redux/actions";
import tools from "../../../tools";
import Spinner from '../../Spinner'
import "./review.css"
import DetalleReview from "./DetalleReview";

const Review = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const actual = useSelector((state) => state.actual);
  const error = useSelector((state) => state.error);
  const [_stat, setStat] = useState(false);

  useEffect(()=>{
    if(error){
      history.push("/err");
    } else{
      if(parseInt(id) === Number(id)){
        dispatch(getReviews(parseInt(id)))
        dispatch(getNot());
      }else{
        tools.alert_notFound( "Reseña", history, "/reviews/")
      }
    }
    return () => dispatch(setActual())
  },[dispatch, error]);

  useEffect(()=>{
    if(actual && actual !== 1 && actual?.stat !== null){
      if(actual.stat === false){
          handleChange();
      } else {
        setStat(actual?.stat);
      }
    }
  },[actual])

  const handleChange = () => {  
    let x = {
      type : "Review",
      pack: {
        id: parseInt(id),
        stat: !_stat,
      }
    }
    setStat(!_stat);
    dispatch(statChange(x));
  }
  
  return (
    typeof actual !== "object" ?
      <div>
        <Spinner/>
      </div> 
      :
    <div className="content_Review">
      <DetalleReview actual={actual} handleChange={handleChange} _stat={_stat}/>
    </div>
  );
};

export default React.memo(Review);

