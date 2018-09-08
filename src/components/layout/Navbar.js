import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-2">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Ibibio Translate
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
            <Link className="nav-link" to="/news">
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/maps">
              Maps
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
          <Link to="/auth/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/auth/register" className="btn btn-warning ml-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
