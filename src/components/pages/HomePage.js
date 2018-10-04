import React, { Component } from "react";
import { Link } from "react-router-dom";
import showcase from "../../img/showcase.png";

import Spinner from 'react-spinner-material';
import {config} from "../../config";
import firebase from 'firebase';
import '@firebase/firestore'
import axios from "axios";
import Post from "../Post/Post";

//actions
import { fetchPosts } from "../../actions/actionCreators"

//REDUX
import { connect } from "react-redux"

class Homepage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.db = firebase.firestore();
  }

  
  componentDidMount() {
    this.db.settings({ timestampsInSnapshots: true });
    this.props.fetchPosts(this.db)
  }


  render() {
    return (
      <div>

        <div className="row pt-5">

          <div className="col-xs-12 col-sm-12 col-md-6 pt-5 text-center mb-5">
            <img
              src={showcase}
              alt="Showcase"
              style={{ maxWidth: "100%", width: "450px" }}
              className="img-responsive"
            />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 mt-5">
            <h1 style={{ fontSize: "4em" }}>Welcome to Dakata Language Hub</h1>
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
              <Link to="/auth/login" style={{ textDecoration: "underline" }}>
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-12 mb-5">
           <h3 className="text-center mx-auto text-secondary">Read Our Blog</h3>
          </div>
          {
            this.props.posts.length !== 0
              ? 
                this.props.posts.slice(0, 3).map((post, i) => <Post key={i} post={post[i]}/>)
              : 
              <div className="text-center mx-auto text-secondary">
                <Spinner
                size={50}
                spinnerColor={"#333"}
                spinnerWidth={2}
                visible={true} />
              </div>
          }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(Homepage);
