import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';
import Loading from './Loading';

const FEED_SEARCH_QUERY = gql`
	query FeedSearchQuery($filter: String!) {
		feed(filter: $filter) {
			links {
				id
				url
				description
				createdAt
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id
					}
				}
			}
		}
	}
`



class Search extends Component {
	state = {
		links: [],
		filter: '',
		loading: false
	}

	_executeSearch = async () => {
		this.setState({ loading: true })
		const { filter } = this.state;
		const result = await this.props.client.query({
			query: FEED_SEARCH_QUERY,
			variables: { filter }
		});
		const links = result.data.feed.links;
		this.setState({ links, loading: false })
	}

	render() {
		return (
			<div>
				<div className="form">
					<label htmlFor="search" className="input search">
						<input 
							type="text" 
							id="search" 
							placeholder="&nbsp;" 
							onChange={e => this.setState({ filter: e.target.value })} 
							onKeyDown={(e) => e.key === 'Enter' ? this._executeSearch() : null}
						/>
						<span className="label">Enter Keyword</span>
						<span className="border"></span>
						<i className="far fa-search" onClick={this._executeSearch}></i>
					</label>
					{/* Search
					<input 
					onChange={e => this.setState({ filter: e.target.value })}
						type="text"
					/>
					<button onClick={() => this._executeSearch()}>Ok</button> */}
				</div>
				
				{
					this.state.loading
					? <Loading/>
					: ''
				}

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