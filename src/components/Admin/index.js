import React, { Component } from "react";
import Modal from "./utils/modal"

import firebase from 'firebase';
import '@firebase/firestore'

//actions
import { fetchPosts } from "../../actions/actionCreators"

import {store} from "../../index"


const config =  {
  placeholderText: 'Edit Your Content Here!',
  charCounterCount: false
}

class AdminPage extends Component {
	constructor() {
		super()
		this.state = {
			isModalOpen: false,
			modalTitle: "Add New Post",
			postTitle: "",
			postAuthor: "",
			postBody: "",
			posts: []
		}

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });

    store.subscribe(() => {
    	this.setState({
    		posts: store.getState().posts
    	}, () => console.log(this.state.posts))

    })
 
	}

	handleBodyChange = e => {
    this.setState({
      postBody: e
    });
  }

	handleTitleAndAuthorChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	toggleModal = () => {
		this.setState({ isModalOpen: true })
	}

	handleBlogPostSubmit = e => {
		e.preventDefault();
		const { postTitle, postAuthor, postBody } = this.state
    this.db.collection('blog-posts').add({
	    postTitle,
	    postBody:postBody,
	    postAuthor: postAuthor,
	    postCreated: new Date().toDateString(),
	    postUpdated: new Date().toDateString(),
	    postSlug: postTitle.split(" ").join("-"),
	    postImageUrl: ""
    })
    	.then(success =>  console.log(success))
    	.catch(err => console.log(err))
	}

	render() {
		const { postTitle, postAuthor, postBody, modalTitle,  } = this.state
		return (
			<div>
				{this.state.isModalOpen ? <Modal onBlogPostSubmit={this.handleBlogPostSubmit} onBodyChange={this.handleBodyChange} onTitleAndAuthorChange={this.handleTitleAndAuthorChange} modalTitle={modalTitle} postTitle={postTitle} postAuthor={postAuthor} postBody={postBody} /> : null}
				<div className="row my-3">

					<div className="col-6">
						<h3 className="text-muted">Blog Posts 
							<span className="badge badge-danger ml-3">34</span>
						</h3>

					</div>

					<div className="col-6">
						<button className="btn btn-danger float-right" data-toggle="modal" data-target="#blogModal" onClick={this.toggleModal}>Add New</button>
					</div>

				</div>

				<div className="row">
					<div className="col-12">
						<table className="table">
						  <thead className="thead-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">First</th>
						      <th scope="col">Last</th>
						      <th scope="col">Handle</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <th scope="row">1</th>
						      <td>Mark</td>
						      <td>Otto</td>
						      <td>@mdo</td>
						    </tr>
						    <tr>
						      <th scope="row">2</th>
						      <td>Jacob</td>
						      <td>Thornton</td>
						      <td>@fat</td>
						    </tr>
						    <tr>
						      <th scope="row">3</th>
						      <td>Larry</td>
						      <td>the Bird</td>
						      <td>@twitter</td>
						    </tr>
						  </tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}



export default AdminPage;
