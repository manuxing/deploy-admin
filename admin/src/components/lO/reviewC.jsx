import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { statChange } from "../../redux/actions";

const reviewC = ({review}) => {
  
  const dispatch = useDispatch();
  const [_stat, setStat] = useState(review.stat);
  
  const handleChange = () => {
    let x = {
      type : "Review",
      pack: {
        id: actual.id,
        stat: !_stat,
      }
    }
    setStat(!_stat);
    dispatch(statChange(x));
  }

  return (
    <tr className="focus-within:bg-gray-200 overflow-hidden hover:bg-gray-100 ">
        <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de reseña:
            {review.dateR}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de la visita:
            {review.dateP}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-7 py-4 flex items-center font-semibold">
        Estado:
            {_stat === true ? "Leida" : "Por ver"}
          </span>
          <button onClick={handleChange()}>change</button>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Descripcion:
            {review.description}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            Medio:
            {review.thg}
        </span>
      </td>
      <td className="border-t">
        <span className="text-gray-700 px-8 py-4 flex items-center  ">
            fecha de visita:
            {review.dateP}
        </span>
      </td>
    </tr>
  );
};

export default reviewC;