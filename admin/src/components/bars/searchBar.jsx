import React, {useState} from "react";
import { useDispatch } from "react-redux";
//traer, hacer search, ademas hacer la ruta para que traiga del back

const SearchBar = () => {
    const dispatch = useDispatch(); 
    let [name, setName] = useState('');

    let handleChange = (evento) => {
        let {value} = evento.target;
        setName(value);
    };
    let handleSubmit = (evento) => {
        evento.preventDefault();
        // dispatch(search(name));
        setName('');
    };

    return (
      <div className="nav">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div className="divv">
            <input
              className="inputt"
              type="text"
              id="title"
              autoComplete="off"
              value={name}
              onChange={(e) => handleChange(e)}
            />
          <button className="button" type="submit">
            {/* <img src={searchIcon} alt="icon"/> */}
          </button>
          </div>
        </form>
      </div>
    );
};

export default SearchBar;