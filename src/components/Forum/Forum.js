import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import General from "./General";
import Private from "./Private";
import Profile from "./Profile";
import Search from "./Search";

class Forum extends Component {
  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <Link className="nav-link active" to="/forum/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum/private">
                  Private
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum/profile">
                  Profile
                </Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/forum/general" component={General} />
              <Route exact path="/forum/search" component={Search} />
              <Route exact path="/forum/private" component={Private} />
              <Route exact path="/forum/profile" component={Profile} />
            </Switch>

          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default Forum;
