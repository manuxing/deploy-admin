import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

// Pages
import NoFound from "./pages/NoFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Games from "./pages/Games";
import Payment from "./pages/Payments";
import Reviews from "./pages/Reviews";

// Layout
import DashboardLayout from "./components/Layout/DashboardLayout";
import AuthLayout from "./components/Layout/AuthLayout";
import EntrepriseLayout from "./components/Layout/EnterpriseLayout";

// Actions
import { authenticateAction } from "./redux/auth/authActions";
import EditUser from "./pages/EditUser";
import CommunityLayout from "./components/Layout/CommunityLayout";

function App() {
  const dispatch = useDispatch();

  const navigate = useHistory();

  useEffect(() => {
    const redirect = dispatch(authenticateAction());

    if (redirect === "redirect") {
      navigate.push("/");
    }
  }, []); 

  return (
    <BrowserRouter>
      <Switch>
        <AuthLayout exact path="/" component={Login} />
        <DashboardLayout path="/dashboard" component={Dashboard} />
        <CommunityLayout path="/users" component={Users} />
        <CommunityLayout path="/games" component={Games} />
        <EntrepriseLayout path="/pays" component={Payment} />
        <CommunityLayout path="/reviews" component={Reviews} />
        <CommunityLayout path="/edit-user/:id" component={EditUser} />
        <Route exact path="/*" component={NoFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
