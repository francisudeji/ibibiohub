import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-spinner-material';
import {config} from "../../config";
import firebase from 'firebase';
import '@firebase/firestore'
import axios from "axios";
import Post from "../Post/Post";

import { connect } from "react-redux"
import renderHTML from "react-render-html"

class BlogPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      postTitle: "",
      postBody: "",
      postSlug: "",
      postAuthor: "",
      postCreated: "",
      isLoading: true
    }
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.postId
    }, e => this.displayPost())
  }

  displayPost = () => {
    const docRef = this.db.collection("blog-posts").doc(this.state.id);

    docRef.get()
    .then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        this.setState({ 
          postTitle: doc.data().postTitle,
          postAuthor: doc.data().postAuthor,
          postBody: doc.data().postBody,
          postSlug: doc.data().postSlug,
          postCreated: doc.data().postCreated
        }, e => this.setState({ isLoading: false }))
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  render() {
    const {postTitle, postAuthor, postBody, postCreated} = this.state
    return (
      <div>
        <nav aria-label="breadcrumb" style={{ backgroundColor: "transparent" }}>
          <ol className="breadcrumb" style={{ backgroundColor: "transparent" }}>
            <Link className="breadcrumb-item" to="/">Home</Link>
            <Link className="breadcrumb-item" to="/blog">Blog</Link>
          </ol>
        </nav>
        {this.state.isLoading ? (
            <div className="row">
              <div className="col-2 mx-auto text-center">
                <div className="text-center mx-auto text-secondary">
                  <Spinner
                  size={50}
                  spinnerColor={"#333"}
                  spinnerWidth={2}
                  visible={true} />
                </div>
              </div>
            </div>
          ):(
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 mx-auto">
                <h1 style={{
                  textRendering: "optimizeLegibility",
                  fontSmoothing: "antialiased",
                  marginBottom: "12px",
                  marginBlockStart: "0.83em",
                  marginBlockEnd: "0.83em"
                }}>{postTitle}</h1>
                <div>
                  <footer className="blockquote-footer mt-3">{postAuthor} | <cite title="Source Title">{postCreated} | 23 comments</cite></footer>
                </div>
                <div className="mt-5 text-dark" 
                  style={{
                    fontWeight: "400",
                    fontStyle: "normal",
                    fontSize: "21px",
                    lineHeight: "1.58",
                    letterSpacing: "-.003em"
                  }}>
                  {renderHTML(postBody)}
                </div>
              </div>
            </div>
          )}
        
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}


export default connect(mapStateToProps)(BlogPage);
