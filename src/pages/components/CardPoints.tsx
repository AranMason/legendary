import React from 'react';

import './CardPoints.css'

import UpArrow from '../../icons/chevron-up-solid.svg';
import DownArrow from '../../icons/chevron-down-solid.svg';

import CardJustification from './CardJustification';

import { connect } from 'react-redux';

type CardPointsProps =
{
	name: string,
	points: number,
	scryfall: any,
	explanation: string,
	changes: {
		date_created: number,
		last_updated: number
	},
	decklist: Array<any>
}

type CardPointsState = {
	hasExpanded: boolean
}

class CardPoints extends React.Component<CardPointsProps, CardPointsState> {

	constructor(props: CardPointsProps){
		super(props);

		this.state = {
			hasExpanded: false
		}

		this.toggleExpanded = this.toggleExpanded.bind(this);

		this.renderArrow = this.renderArrow.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	toggleExpanded(){
		this.setState({
			hasExpanded: !this.state.hasExpanded
		})
	}

	renderArrow(){
		if(this.state.hasExpanded){
			return UpArrow
		} else {
			return DownArrow
		}
	}

	renderContent(styleColour: string){
		if(!this.state.hasExpanded){
			return null;
		}

		return (
			<div className="CardPoints-expanded" style={{
				borderColor: styleColour
			}}>
				<CardJustification {...this.props}/>
			</div>

		)
	}

	render(){

		const isInDecklist = this.props.decklist.find(card => {
			return card.name === this.props.name
		});

		const styleColour = isInDecklist ? "#C5D86D" : "#FAA613";

		return (
			<div className="CardPoints">
				<div className="CardPoints-title" style={{
					backgroundColor: styleColour
				}}>
					<div className="CardPoints-name">
						<strong>{this.props.name}</strong>
					</div>
					<div className="CardPoints-points">
						<strong>{this.props.points}</strong>
					</div>
					<div className="CardPoints-expand">
						<img alt="expand" src={this.renderArrow()} onClick={this.toggleExpanded}></img>
					</div>
				</div>
				{this.renderContent(styleColour)}
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {

	return {
		decklist: state.deck.decklist
	}
}

export default connect(mapStateToProps)(CardPoints);