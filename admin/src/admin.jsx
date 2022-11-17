import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bars from "./components/bars";
import "./App.css";
import About from "../src/components/about/Index";

import Activity from "./components/Details/Activity";
import ActivityLayout from "./components/Layout/activity";
import ActivityR from "./components/create/activity";

import Client from "./components/Details/Client";
import ClientLayout from "./components/Layout/client";

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

            <Route exact path="/" component={About} />
            <Route path="/about/">
                <About />
            </Route>

            <Route path="/activity/:id">
                <Activity />
            </Route>
            <Route path="/activitys/">
                <ActivityLayout />
            </Route>
            <Route path="/create/activity">
                <ActivityR />
            </Route>

            <Route path="/client/:id" component={Client} />
            <Route path="/clients/">
                <ClientLayout />
            </Route>
            <Route path="/create/client">
                <Prueba />
            </Route>

            <Route path="/request/:idR" component={Request} />
            <Route path="/requests/">
                <RequestLayout />
            </Route>
            <Route path="/create/request">
                <RequestR />
            </Route>

            <Route path="/review/:id" component={Review} />
            <Route path="/reviews">
                <ReviewLayout />
            </Route>
            <Route path="/create/review">
                <ReviewR />
            </Route>
            
            <Route path="/service/:id" component={Service} />
            <Route path="/services">
                <ServiceLayout />
            </Route>
            <Route path="/create/service">
                <AgregarServicio />
            </Route>
            <Route path="*" component={ActivityLayout} />

            <Route path="/err">
                <Error />
            </Route>
            
            </Switch>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default Admin;
