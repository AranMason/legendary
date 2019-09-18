import React from 'react';

import PointList from '../data/points.json';
import './PointsList.css';
import CardPoints from './components/CardPoints';
import DeckEvaluator from './components/DeckEvaluator';

import { connect } from 'react-redux';

type Props = {
	decklist: Array<{
		points: number
	}>
}

class PointsListPage extends React.Component<Props> {

	constructor(props: Props){
		super(props);

		this.renderTotalPoints = this.renderTotalPoints.bind(this);
	}

	renderTotalPoints(){
		if(this.props.decklist && this.props.decklist.length > 0){

			const totalPoints = this.props.decklist.map((card: {
				points: number
			}) => {
				return card.points
			}).reduce((sum: number, points: number) => {
				return sum + points;
			})

			return (
				<div>
					<h3>
						{`Total Points: ${totalPoints}`}
					</h3>

				</div>
			)
		}
		return null;
	}

	render() {
		return (
			<div className="PointsList">


				<div className="PointsList-list">
				<h2>Point List</h2>
					{
						PointList.cards.map(card => {
							return <CardPoints {...card} key={card.name} />
						})
					}
					{this.renderTotalPoints()}
				</div>
				<div className="PointsList-content">
					<section>
						<h2>Objective of the Points list</h2>
						<p>
							The objective of this list is to create a way to evaluate decks power level in regards to EDH.
						</p>
						<p>
							Using the CanHigh points list as a basis for the points list, and removing cards already Banned in EDH creates the current point list of ~30 cards. A handful of cards have also been added at a default of 3 or 1 points, to be revised at a later date. These can be seen in the Personal Bias tab. I have also removed a selection of cards from the point list that come from the Candian Highlander points list due to a difference in format playability which can also be seen in the Person Bias Tab.
						</p>
					</section>

					<section>
						<h2>Deck Construction</h2>
						<p>
							This point list is meant to be a guide, and suplement the existing EDH banned list to constrict top level power. It is not a definitive approach to how to build a deck. The idea of the list is to create constraints and force new and interesting deck construction choices.
						</p>
						<p>
							If you do wish to construct a deck using this point list it is recommended to use either 10 or 5 points, depending on desired power level.
						</p>
					</section>

					<section>
						<h2>Future Evolution</h2>
						<p>
						One consideration for the future of this list is with enough community support is releasing cards from the banned list, and giving them appropriate pointed values to allow people with them however constrain thier impact on the wider format.
						</p>
						<p>
						Another fear is this solution validating options in a non-social way by creating a codified justification for deck power levels. This will have to be accounted for and account points for social and not power-level reasons.
						</p>
					</section>

					<section>
						<DeckEvaluator {...PointList}/>
					</section>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state:any) => {
	return {
		decklist: state.deck.decklist
	}
}

export default connect(mapStateToProps)(PointsListPage);