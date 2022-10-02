import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch,useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history'
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoFound from "./pages/NoFound";
import Home from "./components/home";
import Activity from "./components/Details/Activity";
import Client from "./components/Details/Client";
import Request from "./components/Details/Request";
import Review from "./components/Details/Review";

import "../src/App.css"
// import { authenticateAction } from "./redux/auth/authActions";

function App() {
  // const dispatch = useDispatch();

  const navigate = useHistory();
  const newHistory = createBrowserHistory();

  // useEffect(() => {
  //   const redirect = dispatch(authenticateAction());

  //   if (redirect === "redirect") {
  //     navigate.push("/");
  //   }
  // }, []); 

  return (
    <div className="App">
        
      <BrowserRouter>
        <Switch>
          <Route exact path="/"component={Home} />
          <Route path="/Activity/">
            <Activity/>
          </Route>
          <Route path="/Client" component={Client} />
          <Route path="/Request"component={Request} />
          <Route path="/Review" component={Review} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
