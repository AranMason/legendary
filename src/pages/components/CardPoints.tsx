import React from 'react';

import './CardPoints.css'

type CardPointsProps =
{
	name: string,
	points: number
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
	}

	render(){
		return (
			<div className="CardPoints">
				<div className="CardPoints-name">
					{this.props.name}
				</div>
				<div className="CardPoints-points">
					{this.props.points}
				</div>
				<div className="CardPoints-expand">
					{/* ▼ */}
				</div>

			</div>
		)
	}
}

export default CardPoints;