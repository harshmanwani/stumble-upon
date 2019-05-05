import React, { Component } from 'react';



class CreateLink extends Component {
	state = {
		description: '',
		url: ''
	}

	render() {
		const { description, url } = this.state
		return (
			<div>
				<div className="flex flex-column mt3">
					<input 
						type="text"
						className="mb2"
						value={description}
						onChange={e => this.setState({ description: e.target.value })}
						placeholder="A description for the link"
					/>
					<input 
						type="text"
						className="mb2"
						value={url}
						onChange={e => this.setState({ url: e.target.value })}
						placeholder="A URL for the link"
					/>
				</div>
				<button>Submit</button>
			</div>
		)
	}
}

export default CreateLink