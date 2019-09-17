import React from 'react';

import PointList from '../data/points_list.json';

class PointsListPage extends React.Component {
	render() {
		return (
			<div>
				Point List
				<ul>
					{
						Object.keys(PointList).map((card_name, i) => {
							return <li>
								{`${card_name}` }
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}

export default PointsListPage;