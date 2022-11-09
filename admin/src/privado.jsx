import React from "react";
import { Redirect, Route } from "react-router-dom";
import "../src/App.css";
import { useSelector } from "react-redux";

const PrivateComponents = ({component: Component, ...rest}) =>{
  let currentUser = useSelector(state => state.currentUser);
  
  return (
    <Route {...rest}
        render={routeProps =>
          currentUser ? (
                <Component {...routeProps}/>
          ) : (
            <Redirect to={"/signin"}/>
          )}
    />
  );
}

export default PrivateComponents;
