import React from 'react';
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils' 

const Link = (props) => {

	const _voteForLink = () => {
		//
	}

	return (
		<div className="flex mt2 items-start">
			<div className="flex items-center">
				<span className="gray">{props.index + 1}.</span>
				{AUTH_TOKEN && (
					<div className="ml1 gray f11" onClick={_voteForLink}>
						▲
					</div>
				)}
			</div>
			<div className="ml1">
				<div>
					{props.link.description} ({props.link.url})	
				</div>
				<div className="f6 lh-opy gray">
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