import React from 'react';
import {Card} from '../../models';

import { Link, Redirect } from 'react-router-dom';

import { getUser } from '../../actions/loginActions';

import { connect } from 'react-redux';

type Props = {
	cards: Array<Card>,
	getUser: any,
	user: any
	isLoading: boolean
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
		this.props.getUser();
	}

	render(){

		if(!this.props.isLoading && !this.props.user){
			return (
				<Redirect to="/" />
			)
		}

		if(this.props.isLoading){
			return (
				<div>
					Loading
				</div>
			)
		}

		console.log(this.props);

		return (
			<div>
				{/* {this.props.user.username} */}
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
		cards: state.deck.decklist,
		user: state.login.user,
		isLoading: state.login.retrievingUser
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		getUser: () => dispatch(getUser())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)