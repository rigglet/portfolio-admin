import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";

function App() {
  const [auth, setAuth] = useState({});

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          auth.username ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login setAuth={setAuth} />
          </Route>
          <Route exact path="/login">
            <Login setAuth={setAuth} />
          </Route>
          <PrivateRoute path="/admin">
            {/* <Bar />
            <Nav
              projectNo={projects ? projects.length : 0}
              LinkNo={links ? links.length : 0}
              TechNo={technologies ? technologies.length : 0}
            /> */}
            <Admin auth={auth} setAuth={setAuth} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
