import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bars from "./components/bars";
import Home from "./components/home";
import "./App.css"
import About from "../src/components/about/Index";

import Activity from "./components/Details/Activity";
import ActivityLayout from "./components/Layout/activity";
import ActivityR from "./components/create/activity";

import Client from "./components/Details/Client";
import ClientLayout from "./components/Layout/client";
import Form from "./components/create/client/prueba";

import Request from "./components/Details/Request";
import RequestLayout from "./components/Layout/Request";
import RequestR from "./components/create/requeset";

import Review from "./components/Details/Review";
import ReviewLayout from "./components/Layout/review";
import ReviewR from "./components/create/review";

import Service from "./components/Details/Service";
import ServiceLayout from "./components/Layout/services";
import AgregarServicio from "./components/create/service/prueba";
import Error from "./components/Error";
import "../src/App.css";
import Prueba from "./components/create/client/prueba";

function Admin() {

  return (
    <div >
        <BrowserRouter>
            <Bars/>
            <div className="App">
            <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/about/">
                <About />
            </Route>
            <Route path="/activity/:id">
                <Activity />
            </Route>
            <Route path="/activitys/">
                {/* <ActivityLayout /> */}
                <Prueba/>
            </Route>
            <Route path="/createcl">
                <Form />
            </Route>
            <Route path="/createact">
                <ActivityR />
            </Route>
            <Route path="/createrev">
                <ReviewR />
            </Route>
            <Route path="/createreq">
                <RequestR />
            </Route>
            <Route path="/createser">
                <AgregarServicio />
            </Route>
            <Route path="/err">
                <Error />
            </Route>
            <Route path="/client/:id" component={Client} />
            <Route path="/clients/">
                <ClientLayout />
            </Route>
            <Route path="/request/:idR" component={Request} />
            <Route path="/requests/">
                <RequestLayout />
            </Route>
            <Route path="/review/:id" component={Review} />
            <Route path="/reviews">
                <ReviewLayout />
            </Route>
            <Route path="/service/:id" component={Service} />
            <Route path="/services">
                <ServiceLayout />
            </Route>
            </Switch>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default Admin;
