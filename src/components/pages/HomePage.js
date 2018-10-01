import React, { Component } from "react";
import { Consumer } from "../../context/Context";
import { Link } from "react-router-dom";
import showcase from "../../img/showcase.png";

import Spinner from 'react-spinner-material';
import {config} from "../../config";
import firebase from '@firebase/app';
import '@firebase/firestore'
import axios from "axios";
import Post from "../Post/Post";

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

    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        let data = res.data.slice(0, 5)

        this.db.collection('blog').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            const prevPosts = this.state.posts;
            prevPosts.push(doc.data());
            this.setState({
              posts: prevPosts
            });  
          });
        });

      })
      .catch(err => console.log(err))
    
  }


  render() {
    return (
      <div>


        <Consumer>
          {value => {
            const {dispatch} = value;
            dispatch({
              action: "FETCH_POSTS",
              payload: this.state.posts
            });
            console.log(value)
          }}
        </Consumer>

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
            this.state.posts.length > 0 
              ? 
                this.state.posts.map((post, i) => <Post key={i} db={this.db} post={post}/>)
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

export default Homepage;
