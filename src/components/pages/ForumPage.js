import React, { Component } from "react"
import io from 'socket.io-client';
import avatar from "../../img/avatar.png"

import {init, addPost, getPost, returnAllMessages} from "../../socket"

class ForumPage extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	    response: false,
	    endpoint: "http://127.0.0.1:4000",
	    post: "",
	    posts: []
	  };

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

  	addPost({user: "Admin", message: this.state.post})
  	this.setState({ posts: returnAllMessages() });
  } 

	render() {
		return(
			<div className="forum">
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-6 mx-auto">
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
											<div className="card">
												<div className="card-header" style={{ backgroundColor: '#fff' }}>
													<img src={avatar} height="50" width="50"/>
													<p className="lead">{post.user}</p>
												</div>
											</div>
										</div>
									})
							: <p className="lead text-center"></p>}
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default ForumPage;