import React from 'react';

import PointList from '../data/points.json';
import './PointsList.css';

class PointsListPage extends React.Component {
	render() {
		return (
			<div className="PointsList">
				Point List
				<ul>
					{
						PointList.cards.map(card => {
							return <li>
								{`${card.name} \t ${card.points}` }
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}

export default PointsListPage;