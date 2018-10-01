import React, { Component } from "react"
import io from 'socket.io-client';
import avatar from "../../img/avatar.png"
import firebase from '@firebase/app';
import '@firebase/firestore'
import {config} from "../../config";
import { Redirect } from "react-router-dom"

import {init, addPost, getPost, returnAllMessages} from "../../socket"

class ForumPage extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	    response: false,
	    endpoint: "http://127.0.0.1:4000",
	    redirect: false,
	    post: "",
	    posts: [],
	    displayName: "",
	    email: "",
	    emailVerified: "",
	    photoURL: "",
	    sAnonymous: "",
	    uid: "",
	    providerData: ""
	  };


		if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.verifyUser()

	}

	verifyUser = () => {
		firebase.auth().onAuthStateChanged(user => {
		  if (user) {
		    this.setState({
		    	displayName: user.displayName,
			    email: user.email,
			    emailVerified: user.emailVerified,
			    photoURL: user.photoURL,
			    sAnonymous: user.isAnonymous,
			    uid: user.uid,
			    providerData: user.providerData
		    })

		    console.log(user)
		  } else {
		    this.setState({ redirect: true })
		  }
		});
	} 

  componentDidMount() {
  	console.log(init())
  }

  onInputChange = e => {
  	this.setState({ [e.target.name]: e.target.value })
  }

  post = e => {
  	e.preventDefault()
  	if(this.state.post === "")
  		return

  	addPost({username: "Admin", message: this.state.post, timestamp: new Date().toDateString()})
  	this.setState({ posts: returnAllMessages() });
  } 

	render() {
		const { redirect } = this.state
		if(redirect) {
			return ( <Redirect to='/forum'/>)
		} else {
		return(
			<div className="forum">

				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-8 mx-auto">
						<div className="card card-body">
							<form className="form" onSubmit={this.post}>
								<div className="input-group mb-3">
									<textarea onChange={this.onInputChange} name="post" value={this.state.post} placeholder="Type to Post" className="form-control">
									</textarea>
								</div>
								<div className="input-group">
									<button type="submit" className="btn btn-danger btn-block">Post</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-6 mx-auto">
						<div className="row">
							{this.state.posts.length !== 0 
								? this.state.posts.map((post, i) => {
									return <div key={i} className="col-12">
											<div className="card my-3">
												
													<div className="row">
														<div className="col-xs-2 col-sm-2 col-md-2 text-center">
															<img src={avatar} height="50" width="50" className="ml-4 mt-3"/>
														</div>
														<div className="col-xs-10 col-sm-10 col-md-10">
															<div className="card-header py-0" style={{ backgroundColor: '#fff' }}>
																<p className="lead">{post.username} <small>{post.timestamp}</small></p> 
															</div>
															<div className="card-body">
																{post.message}
															</div>
														</div>
													</div>
					
											</div>
										</div>
									})
							: <p className="lead text-center"></p>}
						</div>
					</div>
				</div>
				
			</div>
		);
		}
	}

}

export default ForumPage; // githubpassword9563