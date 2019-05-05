import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

class Search extends Component {
	state = {
		links: [],
		filter: ''
	}

	_executeSearch = async () => {
		//
	}

	render() {
		return (
			<div>
				<div>
					Search
					<input 
						type="text"
						onChange={e => this.setState({ filer: e.target.value })}
					/>
					<button onClick={() => this._executeSearch()}>Ok</button>
				</div>
				{this.state.links.map((link, index) => (
					<Link
						key={link.id}
						link={link}
						index={index}
					/>
				))}
			</div>
		)
	}
}

export default withApollo(Search)