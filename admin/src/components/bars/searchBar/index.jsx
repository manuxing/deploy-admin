import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../../redux/actions";
import "../searchBar/searchBar.css";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  let actual = useSelector(state => state.actualG);
  
  const dispatch = useDispatch();
  let [name, setName] = useState("");

  let handleChange = (evento) => {
    let { value } = evento.target;
    setName(value);
  };
  
  let handleSubmit = (evento) => {
    evento.preventDefault();
    setName("")
    dispatch(search(name, actual.model, actual.currentPage));
  };

  return (
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div className="search">
          <div className="input-box">
            <input
              className="inputt"
              type="text"
              id="title"
              autoComplete="off"
              value={name}
              onChange={(e) => handleChange(e)}
            />
            <button className="button" type="submit">
              <SearchIcon fontSize="small"/>
            </button>
          </div>
        </div>
      </form>
  );
};

export default SearchBar;
