import { Redirect, Route } from "react-router-dom";
import "../src/App.css";
import { useContext } from "react";
import { AuthContext } from "./AuthProv";

function PrivateComponents({component: Component, ...rest}) {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
  return (
    <Route {...rest}
        render={routeProps =>
          currentUser ? (
                <Component {...routeProps}/>
          ) : (
            <Redirect to={"/login"}/>
          )}
    />
  );
}

export default PrivateComponents;
