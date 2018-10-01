import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from '@firebase/app';
import '@firebase/firestore'
import {config} from "../../config";

const styles = {
  borderRadius: {
    borderRadius: "0.25rem"
  }
};

class Navbar extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: ""
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.verifyUser()

  }

  verifyUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) 
        this.setState({ loggedIn: true, email: user.email })
    });
  } 

  render() {
    const  { loggedIn, email } = this.state
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-2">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h4>Dakata Language Hub</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/translate">
                  Translate
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum">
                  Forum
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div
              className="btn-group ml-auto"
              role="group"
              aria-label="Authentication"
            >

                {loggedIn 
                  ? 
                  <Link
                    style={styles.borderRadius}
                    to="/auth/logout"
                    className="btn btn-primary"
                  >Logout</Link>
                  : 
                  <Link
                    style={styles.borderRadius}
                    to="/auth/login"
                    className="btn btn-primary"
                  >Login</Link>             
                }
  
              {!loggedIn 
                ?
                <Link
                  style={styles.borderRadius}
                  to="/auth/signup"
                  className="btn btn-outline-light ml-2"
                >
                  Register
                </Link>
                : 
                ""
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
  }

export default Navbar;
// githubpassword9563