import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FEED_QUERY } from './LinkList'
import { LINKS_PER_PAGE } from '../constants';


const POST_MUTATION = gql`
	mutation PostMutation($description: String!, $url:String!){
		post(description: $description, url: $url) {
			id
			createdAt
			url
			description
		}
	}
`


class CreateLink extends Component {
	state = {
		description: '',
		url: ''
	}

	render() {
		const { description, url } = this.state
		return (
			<div>
				<div className="form">
					<label htmlFor="description" className="input">
						<input type="text" id="description" placeholder="&nbsp;" value={description} onChange={e => this.setState({ description: e.target.value })} />
						<span className="label">A description for the link</span>
						<span className="border"></span>
					</label>
					<label htmlFor="url" className="input">
						<input type="text" id="url" placeholder="&nbsp;" value={url} onChange={e => this.setState({ url: e.target.value })} />
						<span className="label">Links URL</span>
						<span className="border"></span>
					</label>
				</div>
				
				{/* update prop on mutation is called after the server has returned a response.
					Here it reads the localcache for FEED_QUERY and insert the newest link at the beginning
					and write the query results back to the store. 
				 */}

				<Mutation 
					mutation={POST_MUTATION} 
					variables={{description, url}}
					onCompleted={() => this.props.history.push('/new/1')}
					update={(store, { data: {post} }) => {
						const first = LINKS_PER_PAGE;
						const skip = 0;
						const orderBy = 'createdAt_DESC';
						const data = store.readQuery({ 
							query: FEED_QUERY,
							variables: { first, skip, orderBy }
						})
						data.feed.links.unshift(post)
						store.writeQuery({
							query: FEED_QUERY,
							data,
							variables: { first, skip, orderBy }
						})
					}}
				>
					{
						postMutation => (
							<div className="theme-btn" onClick={postMutation}>
								<span>
									Submit
									&nbsp;
									<i className="fal fa-check"></i>
								</span>
							</div>
						)
					}
				</Mutation>

			</div>
		)
	}
}

export default CreateLink