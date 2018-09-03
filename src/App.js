import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Homepage from './components/pages/Homepage';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <div className="container">
              <Route exact path="/" component={Homepage} />
            </div>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
