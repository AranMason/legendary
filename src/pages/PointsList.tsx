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

	constructor(props: Props) {
		super(props);

		this.renderTotalPoints = this.renderTotalPoints.bind(this);
	}

	renderTotalPoints() {
		if (this.props.decklist && this.props.decklist.length > 0) {

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
							The objective of this list is to create a way to evaluate decks power level in regards to EDH.
							This project is not meant to replace commander, but rather to aid and <span>inform discussion regarding powerlevels at the table.</span>
						</p>
						<p>
							Using the CanHigh points list as a basis for the points list, and removing cards already Banned in EDH creates the initial points list.
							All cards that are banned in EDH have been removed from the points list.
						</p>
						{/* <p>
							The following cards have been removed:
						</p>
						<ul>
							<li>
								<span>Mind Twist</span> - It sees zero play at any level of EDH/Commander. Hand attack against a single opponent is a weak stratergy in EDH/Commander.
							</li>
							<li>
								<span>True-name Nemesis</span> - The multiplayer nature of the format makes protection from a single player largely irrelevent. The higher life-total also makes the preasure this card can exert significantly lower as well.
							</li>
						</ul>
						<p>
							The following cards have been added:
						</p>
						<ul>
							<li>
								<span>Cyclonic Rift</span> - Added at 1 point, it's a powerful asymetrical boardwipe. It has been added to drive discussion, however currently it doesn't deserve a high pointing unless further discussion prompts it.
							</li>
							<li>
								<span>Thrasios, Triton Hero</span> - Added at 3 points. Thrasios and Tymna both outclass most of the field and the ubiquity in the field of cEDH along with Tymna is a point of discussion in the community. I felt that adding both initally would be overkill and opted for Thrasios.
							</li>
						</ul> */}
					</section>

					<section>
						<DeckEvaluator {...PointList} />
					</section>

					<section>
						<h2>
							Change Log:
						</h2>

						<h3>Removed:</h3>
						<ul>
							<li>
								<span>Strip Mine</span>
							</li>
							<li>
								<span>Dig through Time</span>
							</li>
							<li>
								<span>Treasure Cruise</span>
							</li>
							<li>
								<span>Umezawa's Jitte</span>
							</li>
							<li>
								<span>Stoneforge Mystic</span>
							</li>
						</ul>

						<h3>Added:</h3>
						<ul>
							<li>
								<span>Ad Nauseam</span> - 2
							</li>
							<li>
								<span>Necropotence</span> - 1
							</li>
							<li>
								<span>Tainted Pact</span> - 2
							</li>
							<li>
								<span>Food Chain</span> - 1
							</li>
							<li>
								<span>Hermit Druid</span> - 1
							</li>
							<li>
								<span>Isochron Scepter</span> - 1 - Might be better to add Dramatic Reversal instead, as Isochron has more 'fair' uses.
							</li>
							<li>
								<span>Lion's Eye Diamond</span> - 1
							</li>
							<li>
								<span>Mystic Remora</span> - 1
							</li>
							<li>
								<span>Carpet of Flowers</span> - 1
							</li>
							<li>
								<span>Tymna the Weaver</span> - 1
							</li>
						</ul>
						<h3>
							Changed:
						</h3>
						<ul>
							<li>
								<span>Thrasios, Triton Hero</span> - Down from 3 to 2.
							</li>
						</ul>
					</section>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		decklist: state.deck.decklist
	}
}

export default connect(mapStateToProps)(PointsListPage);