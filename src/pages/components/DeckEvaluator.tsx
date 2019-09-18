import React from 'react';
import './DeckEvaluator.css'

import { connect } from 'react-redux';

import { setDecklistPoints } from '../../actions/decklistActions'

type Props = {
	cards: Array<Card>,
	setDecklistPoints: any
};

type State = {
	decklist: string,
	cards: Array<string>,
	results?: Array<Card>
};

type Card = {
	name: string,
	points: number,
	scryfall: any,
	explanation: string,
	changes: any
};

class DeckEvaluator extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			decklist: "",
			cards: props.cards.map((card: Card) => {
				return card.name;
			})
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.renderResults = this.renderResults.bind(this);
		this.updateDecklist = this.updateDecklist.bind(this);
	}

	updateDecklist(e: any){
		this.setState({
			decklist: e.target.value
		})
	}

	onSubmit(e: any) {
		e.preventDefault();
		const regex = /[0-9]+[xX]{0,1}(?<card>.*)/i

		const entries = this.state.decklist.split('\n');

		let cards: Array<string> = [];

		entries.forEach(entry => {
				const result = entry.match(regex);
				if(result && result.groups && this.state.cards.indexOf(result.groups.card.trim()) >= 0){
					cards.push(result.groups.card.trim());
				}
		})
		const results = this.props.cards.filter((card) => {
			return cards.indexOf(card.name) >= 0
		})

		this.props.setDecklistPoints(results);
	}

	renderResults() {
		if (!this.state.results)
			return null;

		if(this.state.results.length === 0){
			return (
				<div>
					There are no pointed cards in this decklist
				</div>
			)
		}

		const totalPoints = this.state.results.map(card => {
			return card.points;
		}).reduce((sum, points) => {
			return sum + points;
		});

		return (
			<div>
				<ul>
					{this.state.results.map(card => {
						return (
							<li key={card.name}>
								{`${card.name} - ${card.points}`}
							</li>
						)
					})}
				</ul>
				<div>
					<strong>{`Total Points: ${totalPoints}`}</strong>
					</div>
			</div>
		)

	}

	render() {
		return (
			<div className="DeckEvaluator">
				<h2>
					Deck Evaluator
				</h2>
				<p>
					Paste your decklist below and discover your decks point total
				</p>
				<h3>
					Supported Formats:

				</h3>
				<ul>
						<li>
							1x Card Name
					</li>
						<li>
							1 Card Name
					</li>
						<li>
							Card Name
					</li>
					</ul>

				<textarea value={this.state.decklist} onChange={this.updateDecklist} className="DeckEvaluator-text" placeholder="Enter your decklist here...">

				</textarea>
				<div className="DeckEvaluator-footer">
					<button onClick={this.onSubmit}>Submit</button>
				</div>

				{this.renderResults()}

			</div>
		)
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		setDecklistPoints: (decklist: Array<any>) => dispatch(setDecklistPoints(decklist))
	}
}

export default connect(null, mapDispatchToProps)(DeckEvaluator);