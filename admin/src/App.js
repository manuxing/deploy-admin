import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SingUp from "./pages/SingUp";
import { setCurrentUser } from "./redux/actions";
import PrivateComponents from "./privado";
import firebase from "./firebase"
import Admin from "./admin";
import { useDispatch, useSelector } from "react-redux";

function App() {

  let dispatch = useDispatch();
  let currentUser = useSelector(state => state.currentUser);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(val => dispatch(setCurrentUser(val)));
  },[dispatch, currentUser])


  return (
    <div className="App">
        <BrowserRouter> 
            <Route path="/" >
              <PrivateComponents component={Admin}/>
            </Route>
            <Route path="/signin">
              <SingUp />
            </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
