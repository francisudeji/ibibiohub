import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import TranslatePage from "./components/pages/TranslatePage";
import BlogPage from "./components/pages/BlogPage";
import ForumPage from "./components/pages/ForumPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import AdminPage from "./components/Admin";

import "./App.css"

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/translate" component={TranslatePage} />
              <Route exact path="/blog/:postTitle/:postId" component={BlogPage} />
              <Route exact path="/forum" component={ForumPage} />
              <Route exact path="/auth/login" component={LoginPage} />
              <Route exact path="/auth/signup" component={SignupPage} />
              <Route exact path="/auth/admin" component={AdminPage} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
