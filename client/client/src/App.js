import SideBar from './components/sideBar';
import {BrowserRouter, Route, Switch } from "react-router-dom"
import About from './components/About';
import './App.css';
import SendRequest from './components/Request';
import SendReview from './components/Review';

function App() {
  return (
    <div className="App">
      {/* Client
      pedir about, poner info y abajo contactos

      hacer un lat bar que tenga para hacer solicitudes y reviews
      tambien un coso de contactos que lleve a contactos */}
      <BrowserRouter>
        <SideBar/>  
        <div className='content'>
          <Switch>
          <Route path="/inicio" exact component={About} />
              <Route path="/solicitud" >
                <SendRequest/>
              </Route >
              <Route path={"/reseña"} component={SendReview}/>
              <Route path={"/error"} component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App; 