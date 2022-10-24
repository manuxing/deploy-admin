import { BrowserRouter, Route, Switch} from "react-router-dom";
// Pages
import Home from "./components/home";
import Activity from "./components/Details/Activity";
import ActivityLayout from "./components/Layout/activity";
import ActivityR from "./components/create/activity";
import ClientLayout from "./components/Layout/client";
import RequestLayout from "./components/Layout/Request";
import ReviewLayout from "./components/Layout/review";
import ServiceLayout from "./components/Layout/services";
import Client from "./components/Details/Client";
import Request from "./components/Details/Request";
import Review from "./components/Details/Review";
import "../src/App.css"
import Service from "./components/Details/Service";
import Form from "./components/create/client/prueba";
import ReviewR from "./components/create/review";
import RequestR from "./components/create/requeset";
import AgregarServicio from "./components/create/service/prueba";
// import { authenticateAction } from "./redux/auth/authActions";

function App() {
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
          <Route path="/activity/:id">
            <Activity/>
          </Route>
          <Route path="/activitys/">
            <ActivityLayout/>
          </Route>
          <Route path="/createcl">
            <Form/>
            {/* <ActivityR/> */}
          </Route>
          <Route path="/createact">
            <ActivityR/>
          </Route>
          <Route path="/createrev">
            <ReviewR/>
          </Route>
          <Route path="/createreq">
            <RequestR/>
          </Route>
          <Route path="/createser">
            <AgregarServicio/>
          </Route>
          <Route path="/client/:id" component={Client} />
          <Route path="/clients/">
            <ClientLayout/>
          </Route>
          <Route path="/request/:idR"component={Request} />
          <Route path="/requests/">
            <RequestLayout/>
          </Route>
          <Route path="/review/:id" component={Review} />
          <Route path="/reviews">
            <ReviewLayout/>
          </Route>
          <Route path="/service/:id" component={Service} />
          <Route path="/services">
            <ServiceLayout/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
