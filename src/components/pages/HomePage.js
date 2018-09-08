import React, { Component } from "react";
import Forum from "../Forum/Forum";
import { Link } from "react-router-dom";
import showcase from "../../img/showcase.png";
class Homepage extends Component {
  render() {
    return (
      <div>
        <div className="row pt-5">
          <div className="col-xs-12 col-sm-12 col-md-6 pt-5 text-center mb-5">
            <img
              src={showcase}
              alt="Showcase"
              style={{ maxWidth: "100%" }}
              className="img-responsive"
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6">
            <h1 style={{ fontSize: "2em" }}>Welcome to Dakata Language Hub</h1>
            <p className="lead">
              This is a platform that collects and providea language data for
              all users, indegenous and non indegenous. Here, there is a
              provision of translation, chat, news and much more. Dakata
              Language Hub has got you covered.
            </p>
            <Link
              to="/auth/signup"
              style={{
                fontSize: ".85rem",
                fontWeight: "600",
                padding: "1rem 2rem"
              }}
              className="btn btn-danger btn-lg mb-3"
            >
              GET STARTED
            </Link>
            <p className="text-secondary">
              Already registered?{" "}
              <Link to="/auth/login" style={{ textDecoration: "underliness" }}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
