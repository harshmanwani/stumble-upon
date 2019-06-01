import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'

const VOTE_MUTATION = gql`
	mutation VoteMutation($linkId: ID!) {
		vote(linkId: $linkId) {
			id
			link {
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

const Link = (props) => {

	return (
		<div id="link">
			<div className="upvote-btn">
				{/* <span className="gray">{props.index + 1}.</span> */}
				{AUTH_TOKEN && (
					<Mutation 
						mutation={VOTE_MUTATION} 
						variables={{ linkId: props.link.id }}
						update={(store, {data: { vote }}) => 
							props.updateStoreAfterVote(store, vote, props.link.id)
						}
					>
						{voteMutation => (
							<div onClick={voteMutation}>
								<i className="fas fa-sort-up">
								</i>
								<div className="votes-number">
									{props.link.votes.length}
								</div>
							</div>
						)}
					</Mutation>
				)}
			</div>
			<div>
				<div className="link-title">
					{props.link.description}
				</div>
				<div className="link-details">
					by{' '}
					{props.link.postedBy
					  ? props.link.postedBy.name
					  : 'Unknown'
					}
					{' ● '}
					{timeDifferenceForDate(props.link.createdAt)}
				</div>
			</div>
			<div className="link-btn">
				<a href={props.link.url} target="_blank" rel="noopener noreferrer">
					<i className="far fa-external-link"></i>
				</a>
			</div>
		</div>
	)
}

export default Link