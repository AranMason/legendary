import React from 'react';
import './DeckEvaluator.css'

import { connect } from 'react-redux';

import { setDecklistPoints } from '../../actions/decklistActions'

import { Card } from '../../models';

type Props = {
	cards: Array<Card>,
	setDecklistPoints: any
};

type State = {
	decklist: string,
	// cards: Array<Card>
};

async function scrollTo(className: string){
	const element = document.getElementsByClassName(className);

	if(element && element.length > 0){
		element[0].scrollIntoView({
			behavior: "smooth"
		});
	};
}

class DeckEvaluator extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			decklist: "",
			// cards: props.cards.map((card: Card) => {
			// 	return card.name;
			// })
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.updateDecklist = this.updateDecklist.bind(this);
	}

	updateDecklist(e: any){
		this.setState({
			decklist: e.target.value
		})
	}



	onSubmit(e: any) {
		e.preventDefault();

		if(this.state.decklist.trim().length === 0){
			this.props.setDecklistPoints([]);
		}

		scrollTo("PointsList-list");

		const regex = /^[0-9]+[xX]{0,1}\s*(?<card>[a-zA-Z',/\s]+[a-zA-Z])\s*/i

		const entries = this.state.decklist.split('\n');
		let cards: Array<Card> = [];

		entries.forEach(entry => {
				const result = entry.match(regex);

				if(result && result.groups && result.groups.card){

					const card = this.props.cards.find(n_card => {
						return n_card.name === (result && result.groups && result.groups.card)
					})

					if(card){
						cards.push(card);
					}
				}
		})
		this.props.setDecklistPoints(cards);
	}

	render() {
		return (
			<div className="DeckEvaluator">
				<h2>
					Deck Evaluator
				</h2>

				<textarea value={this.state.decklist} onChange={this.updateDecklist} className="DeckEvaluator-text" placeholder="Enter your decklist here to find your points total...">

				</textarea>
				<div className="DeckEvaluator-footer">
					<button onClick={this.onSubmit}>Submit</button>
				</div>

			</div>
		)
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		setDecklistPoints: (decklist: Array<Card>) => dispatch(setDecklistPoints(decklist))
	}
}

export default connect(null, mapDispatchToProps)(DeckEvaluator);