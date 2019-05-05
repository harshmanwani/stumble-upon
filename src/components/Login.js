import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';

class Login extends Component {
	state = {
		login: true,
		email: '',
		password: '',
		name: ''
	}

	_confirm = async () => {
		//
	}

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}

	render() {
		const { login, email, name, password } = this.statel

		return (
			<div>
				<h4 className="mv3">{ login ? 'Login' : 'Sign Up'}</h4>
				<div className="flex flex-column">
					{!login && (
						<input 
							type="text"
							placeholder="Your Name"
							value={name}
							onChange={e => this.setState({ name: e.target.value })}
						/>
					)}
					<input 
						type="email"
						placeholder="Your email address"
						value={email}
						onChange={e => this.setState({ email: e.target.value })}
					/>
					<input 
						type="password"
						placeholder="Choose a safe password"
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
					/>
				</div>
				<div className="flex mt3">
					<div className="pointer mr2 button" onClick={() => this._confirm()}>
						{login ? 'login' : 'create account'}
					</div>
					<div 
						className="pointer button"
						onClick={() => this.setState({ login: !login })}
					>
						{
							login
							  ? 'need to create an account'
							  : 'already have an account?'
						}
					</div>
				</div>
			</div>
		)
	}
}

export default login;