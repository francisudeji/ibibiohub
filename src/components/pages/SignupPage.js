import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import firebase from "firebase"

import {config} from "../../config";

class SignupPage extends Component {

		constructor() {
			super()
			this.state = {
				firstname: "",
				lastname: "",
				email: "",
				password: "",
				hasError: false,
				message: "",
				redirect: false
			}

			if (!firebase.apps.length) {
	      firebase.initializeApp(config);
	    }

	    
		}

		


		onFormChange = e => {
			this.setState({ [e.target.name]: e.target.value })
		}

		onSignup = e => {
			e.preventDefault()
			const { firstname, lastname, email, password } = this.state

			const data = { firstname, lastname, email, password }

			if(Object.values(data).length !== 4) {
				this.setState({hasError: true, message: "Fill in every input fields"})
				return
			}

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				this.setState({ hasError: false, message: "", redirect: true })
				console.log("user created", {user})
			})
			.catch(function(error) {
			  // Handle Errors here.
			  let errorCode = error.code;
			  let errorMessage = error.message;
			  this.setState({hasError: true, message: errorMessage})
			});
		}

		render() {
		const { firstname, lastname, email, password, message, redirect } = this.state
		if(redirect) {
			return ( <Redirect to='/forum'/>)
		} else {
		return (
			<div className="bg-light" style={{ height: "50vh" }}>
			<div className="container">
					<div className="row ">
						<div className="col-xs-12 col-sm-5 col-md-5 mt-3 mb-5 mx-auto">
							<div className="card">
								<div className="card-header">
									<h3 className="text-center">Welcome, Signup to Continue</h3>
								</div>
								<div className="card-body">
									<form onSubmit={this.onSignup}>
										{	message 
											? 
											<div className="alert alert-danger">{message}</div>
											: ""
										}
										<div className="form-group">
									    <label htmlFor="email">First Name</label>
									    <input type="text" className="form-control" id="firstname" aria-describedby="firstname" placeholder="Enter First Name" onChange={this.onFormChange} name="firstname" value={firstname}/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="lastname">Last Name</label>
									    <input type="text" className="form-control" id="lastname" aria-describedby="lastname" placeholder="Enter Last Name" onChange={this.onFormChange} name="lastname" value={lastname}/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="email">Email address</label>
									    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onFormChange} name="email" value={email}/>
									    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
									  </div>
									  <div className="form-group">
									    <label htmlFor="password">Password</label>
									    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.onFormChange} name="password" value={password}/>
									  </div>
									  <div>
									  	<div className="row mb-3">
									  		<div className="col-6">
									  			
									  		</div>
									  		<div className="col-6">
									  			<Link className="float-right"to="/auth/login">Go to Login Page</Link>
									  		</div>
									  	</div>
									  	
										</div>
									  <button type="submit" className="btn btn-primary btn-block">Create My Account</button>
									</form>
								</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		);
		}
	}

}

export default SignupPage;