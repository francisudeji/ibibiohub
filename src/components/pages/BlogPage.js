import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-spinner-material';
import {config} from "../../config";
import firebase from '@firebase/app';
import '@firebase/firestore'
import axios from "axios";
import Post from "../Post/Post";

class BlogPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {console.log(this.props.match.params.postTitle)}
      </div>
    );
  }

}

export default BlogPage;
