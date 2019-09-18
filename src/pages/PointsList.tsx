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
					<h4>
						{`Total Points: ${totalPoints}`}
					</h4>

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
					{this.renderTotalPoints()}
					{
						PointList.cards.map(card => {
							return <CardPoints {...card} key={card.name} />
						})
					}
					
				</div>
				<div id="content" className="PointsList-content">
					<section>
						<h2>Objective of the Points list</h2>
						<p>
							The objective of this list is to create a way to evaluate decks power level in regards to EDH. This project is not meant to replace commander, but rather to aid and inform discussion regarding powerlevels at the table.
						</p>
						<p>
							Using the CanHigh points list as a basis for the points list, and removing cards already Banned in EDH creates the initial points list. All cards that are banned in EDH have been removed from the points list.
						</p>
						<p>
							The following cards have been removed:
						</p>
						<ul>
							<li>
								Mind Twist - It sees zero play at any level of EDH/Commander. Hand attack against a single opponent is a weak stratergy in EDH/Commander.
							</li>
							<li>
								True-name Nemesis - The multiplayer nature of the format makes protection from a single player largely irrelevent. The higher life-total also makes the preasure this card can exert significantly lower as well.
							</li>
						</ul>
						<p>
							The following cards have been added:
						</p>
						<ul>
							<li>
								Cyclonic Rift - Added at 1 point, it's a powerful asymetrical boardwipe. It has been added to drive discussion, however currently it doesn't deserve a high pointing unless further discussion prompts it.
							</li>
							<li>
								Thrasios, Triton Hero - Added at 3 points. Thrasios and Tymna both outclass most of the field and the ubiquity in the field of cEDH along with Tymna is a point of discussion in the community. I felt that adding both initally would be overkill and opted for Thrasios.
							</li>
						</ul>
					</section>

					<section>
						<h2>Impact on Deck Construction</h2>
						<p>
							This point list is meant to be a guide, and suplement the existing EDH banned list to constrict top level power. It is not a definitive approach to how to build a deck. The idea of the list is to create constraints and force new and interesting deck construction choices.
						</p>
						<p>
							This points list is not meant to be used as a method to shame, or justify conflict in personal playgroups. 
						</p>
						{/* <p>
							If you do wish to construct a deck using this point list it is recommended to use either 10 or 5 points, depending on desired power level.
						</p> */}
					</section>

					<section>
						<h2>Future Evolution</h2>
						{/* <p>
						One consideration for the future of this list is with enough community support is releasing cards from the banned list, and giving them appropriate pointed values to allow people with them however constrain thier impact on the wider format.
						</p> */}
						<p>
							A fear is this solution validating opinions in a non-social way by creating a codified justification for deck power levels. This will have to be accounted for and account points for social and not power-level reasons.
						</p>
						<p>
							Future progress will involved evaulating and evolving the list. The first iteration when evaluated against current version of Primary cEDH decks found in the cEDH Database (<a href="https://cedh-decklist-database.xyz/primary.html" rel="noopener noreferrer" target="_blank">Link</a>) consistantly score approximately 20 points. With outliers such as Godo Helm sitting at only 9 points, and Tymna / Thrasios hulk sitting at around 35-37 points depending on decklist.
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