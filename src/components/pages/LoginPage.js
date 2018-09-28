import React, { Component } from "react"
import { Link } from "react-router-dom"
import firebase from "firebase"
import {config} from "../../config";

class LoginPage extends Component {

	state = {
		email: "",
		password: "",
		isLoggedIn: false,
		hasError: false,
		message: ""

	}

	login = (email, password) => {

		if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => {
			console.log(user)
		})
		.catch(error => {
		  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  this.setState({ hasError: true, message: errorMessage })
		});
	}

	onLogin = e => {
		e.preventDefault()
		const { email, password } = this.state
		if(email === "" || password === "") {
			this.setState({ hasError: true, message: "Please fill in all input fields" })
			return
		}
		this.login(email, password)
	}

	onFormChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { email, password, message } = this.state
		return (
			<div className="bg-light" style={{ height: "50vh" }}>
			<div className="container">
					<div className="row ">
						<div className="col-xs-12 col-sm-5 col-md-5 mt-5 mx-auto">
							<div className="card">
								<div className="card-header">
									<h3 className="text-center">Welcome, Login to Continue</h3>
								</div>
								<div className="card-body">
									<form onSubmit={this.onLogin}>
										{	message 
											? 
											<div className="alert alert-danger">{message}</div>
											: ""
										}
									  <div className="form-group">
									    <label htmlFor="email">Email address</label>
									    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onFormChange} name="email" value={email}/>
									    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
									  </div>
									  <div className="form-group">
									    <label htmlFor="password">Password</label>
									    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.onFormChange} name="password" value={password}/>
									  </div>
									  <div className="text-right">
											<Link to="/auth/password-recovery">forgot password ?</Link>
										</div>
									  <button type="submit" className="btn btn-primary">Login</button>
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

export default LoginPage;