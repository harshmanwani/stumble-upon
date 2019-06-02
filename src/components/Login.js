import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
	mutation SignUpMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`
const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`


class Login extends Component {
	state = {
		login: true,
		email: '',
		password: '',
		name: ''
	}

	_confirm = async (data) => {
		const { token } = this.state.login ? data.login : data.signup;
		this._saveUserData(token);
		this.props.history.push('/')
	}

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}

	render() {
		const { login, email, name, password } = this.state;

		return (
			<div>
				{/* <h4 className="mv3">{ login ? 'Login' : 'Sign Up'}</h4> */}
				<div className="form">
					{!login && (
						// <input 
						// 	type="text"
						// 	placeholder="Your Name"
						// 	value={name}
						// 	onChange={e => this.setState({ name: e.target.value })}
						// />
						<label for="name" class="input">
							<input type="text" id="name" placeholder="&nbsp;" value={name} onChange={e => this.setState({ name: e.target.value })}/>
								<span class="label">Enter Your Name</span>
								<span class="border"></span>
						</label>
					)}
					<label for="email" class="input">
						<input type="email" id="email" placeholder="&nbsp;" value={email} onChange={e => this.setState({ email: e.target.value })}/>
						<span class="label">Enter Email</span>
						<span class="border"></span>
					</label>
					{/* <input 
						type="email"
						placeholder="Your email address"
						value={email}
						onChange={e => this.setState({ email: e.target.value })}
					/> */}
					<label for="pass" class="input">
						<input type="password" id="pass" placeholder="&nbsp;" value={password} onChange={e => this.setState({ password: e.target.value })}/>
						<span class="label">{login ? "Enter your password" : "Choose a safe password"}</span>
						<span class="border"></span>
					</label>
					{/* <input 
						type="password"
						placeholder={login ? "Enter your password" : "Choose a safe password"}
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
					/> */}
				</div>
				<div className="form-actions">
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{ email, password, name }}
						onCompleted={data => this._confirm(data)}
					>
						{mutation => (
							<div className="theme-btn" onClick={mutation}>
								<span>
									{login ? 'login' : 'create account'}
									&nbsp;
									<i className="fal fa-long-arrow-right"></i>
									</span>
							</div>
							// <div className="pointer mr2 button" onClick={mutation}>
							// 	{login ? 'login' : 'create account'}
							// </div>
						)}
					</Mutation>

					<div 
						className="form-action-secondary"
						onClick={() => this.setState({ login: !login })}
					>
						{
							login
							  ? <span>
								  Don't have an account? 
								  <span className="underline-fill">Sign up</span>
								</span>
							  : <span>
								  Already have an account?
								  <span className="underline-fill">Sign in</span>
								</span>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Login;