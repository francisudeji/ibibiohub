import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import TranslatePage from "./components/pages/TranslatePage";
import BlogPage from "./components/pages/BlogPage";
import ForumPage from "./components/pages/ForumPage";
import Admin from "./components/Admin";
import { Provider } from "./context/Context";


//
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true
    }
  }

  
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/translate" component={TranslatePage} />
                <Route exact path="/blog/:postTitle" component={BlogPage} />
                <Route exact path="/forum" component={ForumPage} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
