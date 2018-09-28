import React, { Component } from "react"
import { Link } from "react-router-dom"

class LoginPage extends Component {

	state = {
		email: "",
		password: "",
		isLoggedIn: false
	}

	onFormChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { email, password } = this.state
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
									<form>
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