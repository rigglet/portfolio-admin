import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";
//import Nav from "./components/nav";

function App() {
  const loggedIn = false;
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/admin">
            {loggedIn ? <Redirect to="/login" /> : <Admin />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
