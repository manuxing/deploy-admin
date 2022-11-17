import SideBar from './components/sideBar';
import {BrowserRouter, Route, Switch } from "react-router-dom"
import About from './components/About';
import './App.css';
import SendRequest from './components/Request';
import SendReview from './components/Review';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar/>  
        <div className='content'>
          <Switch>
          <Route  exact path="/" component={About} />
              <Route path="/solicitud" >
                <SendRequest/>
              </Route >
              <Route path={"/reseña"} component={SendReview}/>
              <Route path={"/error"} component={Error}/>
              <Route  path="*" component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App; 