import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import TranslatePage from "./components/pages/TranslatePage"
import { Provider } from "./context/Context";

class App extends Component {
  state = {
    isLoggedIn: true
  }

  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/forum/general" component={HomePage} />
                <Route exact path="/translate" component={TranslatePage} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
