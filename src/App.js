import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
//import Nav from "./components/nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
