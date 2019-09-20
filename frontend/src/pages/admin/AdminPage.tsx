import React from 'react';
import {Card} from '../../models';

import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

type Props = {
	cards: Array<Card>
}

type State = {
	points: Array<Card>,
	redirect?: string,
	isLoading: boolean
}

class AdminPage extends React.Component<Props, State> {

	constructor(props: Props){
		super(props);

		this.state = {
			points:[],
			isLoading: true
		}
	}

	componentDidMount(){
		axios.get('http://localhost/users/status').then(res => {
			this.setState({
				isLoading: false
			})
		}).catch(err => {
			console.error(err);
			this.setState({
				redirect: "/"
			})
		})
	}

	render(){

		if(this.state.redirect){
			return (
				<Redirect to={this.state.redirect} />
			)
		}

		if(this.state.isLoading){
			return (
				<div>
					Loading
				</div>
			)
		}

		return (
			<div>
				<ul>
					{this.state.points.map(card => {
						return (
							<li key={card.name}>
								<Link to={`/edit/${card.name}`}>{card.name}</Link>
							</li>
						)
					})}
					TODO: Allow adding new cards to the list and deleting
				</ul>

			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		cards: state.deck.decklist
	}
}

export default connect(mapStateToProps)(AdminPage)