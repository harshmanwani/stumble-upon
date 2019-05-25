import React from 'react';
import Link from './Link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


/*
Skip defines the offset where the query will start. 
	If you passed a value of e.g. 10 for this argument, it means that the first 10 items of the list will not be included in the response. 
First then defines the limit, or how many elements, you want to load from that list. 
	Say, you’re passing the 10 for skip and 5 for first, you’ll receive items 10 to 15 from the list. 
orderBy defines how the returned list should be sorted.
*/
export const FEED_QUERY = gql`
	query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
		feed(first: $first, skip: $skip, orderBy: $orderBy) {
			links {
				id
				createdAt
				url
				description
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

const NEW_LINKS_SUBSCRIPTION = gql`
	subscription {
		newLink {
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
`

const NEW_VOTES_SUBSCRIPTION = gql`
	subscription {
		newVote {
			id
			link {
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
			user {
				id
			}
		}
	}
`

const LinkList = () => {

	const _updateCacheAfterVote = (store, createVote, linkId) => {
		const data = store.readQuery({ query: FEED_QUERY })

		const votedLink = data.feed.links.find(link => link.id === linkId)
		votedLink.votes = createVote.link.votes

		store.writeQuery({ query: FEED_QUERY, data })
	}

	const _subscribeToNewLinks = subscribeToMore => {

		//calling subscribe to more with 1. Subscription query 2. new data by comparing if its actually updated or same as old.

		subscribeToMore({
			document: NEW_LINKS_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if(!subscriptionData.data) return prev
				const newLink = subscriptionData.data.newLink
				const exists = prev.feed.links.find(({ id }) => id === newLink.id);
				if(exists) return prev;

				return Object.assign({}, prev, {
					feed: {
						links: [newLink, ...prev.feed.links],
						count: prev.feed.links.length + 1,
						__typename: prev.feed.__typename
					}
				})
			}
		})
	}


	const _subscribeToNewVotes = subscribeToMore => {
		subscribeToMore({
			document: NEW_VOTES_SUBSCRIPTION
		})
	}


	const _getQueryVariables = () => {
		const isNewPage = this.props.location.pathname.includes('new');
		const page = parseInt(this.props.match.params.page, 10) // parseint parse the string to integer with the given base(radix) value

		const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
		const first = isNewPage ? LINKS_PER_PAGE : 100;
		const orderBy = isNewPage ? 'createdAt_DESC' : null

		return { first, skip, orderBy }
	}


  return (
		<Query query={FEED_QUERY} variables={_getQueryVariables()}>
			{
				({ loading, error, data, subscribeToMore }) => {
				if(loading) return <div>Fetching</div>
				if(error) return <div>Error</div>

				_subscribeToNewLinks(subscribeToMore)
				_subscribeToNewVotes(subscribeToMore)

				const linksToRender = data.feed.links

				return (
					<div>
						{
							linksToRender.map((link, index) => (
								<Link 
									key={link.id} 
									link={link} 
									index={index}
									updateStoreAfterVote={_updateCacheAfterVote}
								/>)
							)
						}
					</div>
				)}
			}
		</Query>
    )
}

export default LinkList