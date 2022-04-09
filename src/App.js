import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";
import * as aiIcons from "react-icons/ai";
import * as bsIcons from "react-icons/bs";
import * as biIcons from "react-icons/bi";
import * as fcIcons from "react-icons/fc";
import * as giIcons from "react-icons/gi";
import * as goIcons from "react-icons/go";
import * as grIcons from "react-icons/gr";
import * as ioIcons from "react-icons/io";
import * as io5Icons from "react-icons/io5";
import * as riIcons from "react-icons/ri";
import * as tiIcons from "react-icons/ti";
import * as wiIcons from "react-icons/wi";

import * as cgIcons from "react-icons/cg";
import * as mdIcons from "react-icons/md";
import * as vscIcons from "react-icons/vsc";
import * as hiIcons from "react-icons/hi";
import * as imIcons from "react-icons/im";
import * as siIcons from "react-icons/si";
import * as diIcons from "react-icons/di";
import * as fiIcons from "react-icons/fi";
import * as faIcons from "react-icons/fa";

function App() {
  const [auth, setAuth] = useState({});

  //icons
  let allIcons = {
    ...aiIcons,
    ...bsIcons,
    ...biIcons,
    ...fcIcons,
    ...giIcons,
    ...goIcons,
    ...grIcons,
    ...ioIcons,
    ...io5Icons,
    ...riIcons,
    ...tiIcons,
    ...wiIcons,
    ...cgIcons,
    ...mdIcons,
    ...diIcons,
    ...faIcons,
    ...fiIcons,
    ...hiIcons,
    ...imIcons,
    ...siIcons,
    ...vscIcons,
  };

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
            <Admin auth={auth} setAuth={setAuth} allIcons={allIcons} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
