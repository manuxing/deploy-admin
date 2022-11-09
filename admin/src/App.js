import React, { useEffect } from "react";
import { Router, Route, useHistory } from "react-router-dom";
import SingUp from "./pages/SingUp";
import { setCurrentUser } from "./redux/actions";
import PrivateComponents from "./privado";
import { createBrowserHistory } from 'history'
import firebase from "./firebase"
import Admin from "./admin";
import { useDispatch, useSelector } from "react-redux";

function App() {

  let dispatch = useDispatch();
  let history = useHistory();
  let currentUser = useSelector(state => state.currentUser);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(val => dispatch(setCurrentUser(val)));
  },[dispatch, currentUser])

  const newHistory = createBrowserHistory();

  return (
    <div className="App">
        <Router history={newHistory}> 
            <Route path="/" >
              <PrivateComponents component={Admin}/>
            </Route>
            <Route path="/signin">
              <SingUp history={history}/>
            </Route>
        </Router>
    </div>
  );
}

export default App;
