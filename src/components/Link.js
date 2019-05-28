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
		<div id="link" className="flex mt2 items-start">
			<div className="flex items-center">
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
							<div className="ml1 gray f11" onClick={voteMutation}>
								▲
							</div>
						)}
					</Mutation>
				)}
			</div>
			<div className="ml1">
				<div className="link-title">
					{props.link.description} ({props.link.url})	
				</div>
				<div className="f6 lh-opy gray link-details">
					{props.link.votes.length} votes | by{' '}
					{props.link.postedBy
					  ? props.link.postedBy.name
					  : 'Unknown'
					}
					&nbsp;
					{timeDifferenceForDate(props.link.createdAt)}
				</div>
			</div>
		</div>
	)
}

export default Link