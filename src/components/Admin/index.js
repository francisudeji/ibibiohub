import React, { Component } from "react";
import Modal from "./utils/modal"

import firebase from 'firebase';
import '@firebase/firestore'

//actions
import { getPosts, fetchPosts } from "../../actions/actionCreators"

import {store} from "../../index"

import { connect } from "react-redux"

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
			posts: [],
			message: {
				type: "",
				text: ""
			}
		}

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });
	}

	componentDidMount() {
		this.props.getPosts()
		if(this.props.fetchPosts(this.db)) 
				this.setState({ posts: this.props.posts })
		console.log(this.state)
	}

	editPost = e => {
		const id = e.target.dataset.id
		this.db.collection('blog-posts').doc(id).get().then(doc => console.log(doc));
	}

	deletePost = e => {
		const id = e.target.dataset.id
		if(window.confirm("Are you sure you want to delete this entry ? \nThis action cannot be undone.")) {
			if(this.db.collection('blog-posts').doc(id).delete()) {
				alert(`Successfully deleted post with ID of ${id}`);
				this.props.fetchPosts(this.db)
			}
		}
		
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
	    postBody,
	    postAuthor,
	    postCreated: new Date().toDateString(),
	    postUpdated: new Date().toDateString(),
	    postSlug: postTitle.split(" ").join("-").toLowerCase()
    })
    	.then(success =>  this.setState({
	    		message: {
	    			type: "success",
	    			text: "Successfully added post"
	    		},
	    		postTitle: "",
					postAuthor: "",
					postBody: ""
	    	}, this.props.fetchPosts(this.db))
    	)

    	.catch(err => this.setState({
    		message: {
    			type: "danger",
    			text: "Failed to add post"
    		}
    	}))
	}


	render() {

		const { postTitle, postAuthor, postBody, modalTitle, message } = this.state
		return (
			<div>
				{this.state.isModalOpen ? <Modal onBlogPostSubmit={this.handleBlogPostSubmit} onBodyChange={this.handleBodyChange} onTitleAndAuthorChange={this.handleTitleAndAuthorChange} modalTitle={modalTitle} postTitle={postTitle} postAuthor={postAuthor} postBody={postBody} message={message}/> : null}
				<div className="row my-3">

					<div className="col-6">
						<h5 className="text-muted">Blog Posts 
							<span className="badge badge-danger ml-3">{this.props.posts.length}</span>
						</h5>

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
						      <th scope="col">Title</th>
						      <th scope="col">Author</th>
						      <th scope="col">Actions</th>
						    </tr>
						  </thead>
						  <tbody>
						    
						    { this.props.posts.length > 0 
						    	? 
						    		this.props.posts.map((post, i) => <tr key={post.id}>
											<td scope="row">{i}</td>
									      <td>{post.postAuthor}</td>
									      <td>{post.postTitle}</td>
									      <td className="text-center">
													<button data-id={post.id} type="button" className="btn btn-default mb-2">edit</button>
													<button onClick={this.deletePost} data-id={post.id} type="button" className="btn btn-danger ml-1 mb-2">delete</button>
									      </td>
						    		</tr>)
						    	: <tr></tr> 
						    }
						  </tbody>
						</table>
					</div>
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


export default connect(mapStateToProps, { getPosts, fetchPosts })(AdminPage);
