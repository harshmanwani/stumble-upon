import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'
import Logo from './Logo';

class Header extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN)

		return (
			<div id="header">

				<div className="header-logo">
					<Logo />
					<div className="tagline">
						Stumble Upon
					</div>
				</div>

				<div className="links">

					<div className="left">

						<Link to="/top" className="">
							Top
						</Link>

						{/* <div className="ml1">|</div> */}

						<Link to="/" className="">
							New
						</Link>

						{/* <div className="ml1">|</div> */}

						{authToken && (
							<div className="flex">
								<div className="ml1">|</div>
								<Link to="/create" className="">
									Submit
								</Link>
							</div>
						)}
					</div>

					
					<div className="right">

						<Link to="/search" className="">
							Search
						</Link>

						{authToken ? (
							<div
								className=""
								onClick={() => {
									localStorage.removeItem(AUTH_TOKEN)
									this.props.history.push(`/`)
								}}
							>
								logout
							</div>
						) : (
							<Link to="/login" className="">
								login
							</Link>
						)}

						<Link to="/about" className="">
							About
						</Link>
					</div>

				</div>
			</div>
		)
	}
}

export default withRouter(Header)
