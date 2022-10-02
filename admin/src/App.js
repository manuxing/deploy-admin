import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch,useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history'


// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoFound from "./pages/NoFound";
import Home from "./components/Home";
import Activity from "./components/Details/Activity.jsx";
import Client from "./components/Details/Client.jsx";
import Request from "./components/Details/Request.jsx";
import Review from "./components/Details/Review.jsx";
import NavBar from "./components/bars/NavBar";
import SearchBar from "./components/bars/searchBar";
import SideBar from "./components/bars/SideBar";
// Layout
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
        <NavBar/>
        <SideBar/>
        <Switch>
          <Route path="/"component={Home} />
          <Route path="/Activity" component={Activity} />
          <Route path="/Client" component={Client} />
          <Route path="/Request"component={Request} />
          <Route path="/Review" component={Review} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
