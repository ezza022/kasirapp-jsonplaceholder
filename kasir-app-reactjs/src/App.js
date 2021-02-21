import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sukses from "./container/Sukses";
import Home from "./container/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sukses" component={Sukses} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
