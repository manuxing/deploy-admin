import React, {useState, useEffect} from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, statChange, setActual, getNot } from "../../../redux/actions";
import tools from "../../../tools";
import Spinner from '../../Spinner'
import "./review.css"


const Review = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const actual = useSelector((state) => state.actual);
  const error = useSelector((state) => state.error);
  const [_stat, setStat] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(()=>{
    console.log(error);
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
  },[dispatch, error]);

  useEffect(()=>{
    if(actual && actual !== 1 && actual?.stat !== null){
      if(actual.stat === false){
        dispatch(statChange({
          type : "Review",
          pack: {
            id: parseInt(id),
            stat: !actual.stat,
          }
        }));
        setStat(!actual?.stat);
      } else {
        setStat(actual?.stat);
      }
      setLoading(false);
    }else{
      setLoading(true)
    }
  },[loading,actual])

  useEffect(() => {
    return () => dispatch(setActual())
  }, []);

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
    loading === true ?
    <div>
      <Spinner/>
    </div> 
    :
        <div className="content_Review">
          {actual && actual.clients && actual.clients.length > 0 ?
            <div  className="div_rev">
              <span className="span_rev">
                Cliente
              </span>
              <NavLink  className="link" to={`/client/${actual?.clients[0].id}`}>
                {actual?.clients[0].name ? actual?.clients[0].name : "name"}
              </NavLink>
            </div> 
            : 
            <></>
          }
          <div  className="div_rev">
            <span className="span_rev">
              Descripcion
            </span>
            {actual?.description ? actual?.description : "description"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
                Servicios
            </span>
            <div>
                  {
                    actual?.services ? actual?.services.map(p => { 
                      return (
                      <NavLink key={`${p.id}`}  className="link" to={`/service/${p.id}`}>
                        <span key={p.name}>{p.name}</span>
                      </NavLink>
                    ) 
                    }) : "services"
                  }
            </div>
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              Medio
            </span>
            {actual?.thg ? actual?.thg : "medio"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              fecha de actividad
            </span>
            {actual?.dateR ? actual?.dateR : "fecha de actividad"}
          </div>
          <div  className="div_rev">
            <span className="span_rev">
              fecha de reseña
            </span>
            {actual?.dateP ? actual.dateP : "fecha de reseña"}
          </div>
          <div className="item_requestD">
            <span className="span_request">
              Estado:
              {_stat === true ? "Leida" : "Por ver"}
            </span>
              <button onClick={() => handleChange()}>change</button>
          </div>
        </div>
  );
};

export default Review;

