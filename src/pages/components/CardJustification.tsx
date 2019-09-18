import React from 'react';

import './CardJustification.css';
import moment from 'moment';

type CardPointsProps =
	{
		name: string,
		points: number,
		explanation: string,
		image_url: string,
		scryfall_uri: string
		date_created: number,
		last_updated: number
	}


class CardJustification extends React.Component<CardPointsProps> {

	render() {
		return (
			<div className="CardJustification">
				<div className="CardJustification-card-container">
					<img className="CardJustification-card-image" alt={this.props.name} src={this.props.image_url}></img>
				</div>
				<div className="CardJustification-content">
					{/* <h2>
						{this.props.name}
					</h2> */}
					<div className="CardJustification-exaplanation">
						{this.props.explanation}
					</div>
					<div className="CardJustification-footer">
						<div className="CardJustification-footer-update">
							Last updated: {moment(this.props.last_updated).fromNow()}
						</div>
						<div >
							<a className="CardJustification-footer-button" href={this.props.scryfall_uri} target="_blank" rel="noopener noreferrer">
								<button>
									View Card
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CardJustification;