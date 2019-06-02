import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'
import Logo from './Logo';

class Header extends Component {
	// constructor(props){
	// 	super(props);
	// }

	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN)
		const page = this.props.location.pathname;

		return (
			<div id="header">

				<div className="links">

					<div className="left">

						<Link to="/top" className={page.includes('top') ? 'text-highlight' : ''}>
							Top
						</Link>

						{/* <div className="ml1">|</div> */}

						<Link to="/" className={page.includes('new') ? 'text-highlight' : ''}>
							New
						</Link>

						{/* <div className="ml1">|</div> */}

						{authToken && (
								<Link to="/create" className={page.includes('submit') ? 'text-highlight' : ''}>
									Submit
								</Link>
						)}
					</div>

					
					<div className="right">

						<button onClick={this.props.themeToggle}>
							<i className="fal fa-sun"></i>
						</button>

						<Link to="/search" className={page.includes('search') ? 'text-highlight' : ''}>
							<i className="fal fa-search"></i>
							&nbsp;Search
						</Link>

						{authToken ? (
							<div
								onClick={() => {
									localStorage.removeItem(AUTH_TOKEN)
									this.props.history.push(`/`)
								}}
							>
								Logout
							</div>
						) : (
							<Link to="/login" className={page.includes('login') ? 'text-highlight' : ''}>
								Login
							</Link>
						)}

						<Link to="/about" className={page.includes('about') ? 'text-highlight' : ''}>
							About
						</Link>
					</div>

				</div>


				<div className="header-logo">
					<Logo />
					<div className="tagline">
						Stumble Upon
					</div>
				</div>


			</div>
		)
	}
}

export default withRouter(Header)
