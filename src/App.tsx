import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PointsListPage from './pages/PointsList';

const App: React.FC = () => {
	return (
		<Router>
		<div className="App">
			<header className="App-header">
			<Link to="/">Legendary Commander</Link>
			<Link to="/points">Points List</Link>
      </header>
			<section className="App-body">
					<Route path="/" component={PointsListPage} />
					<Route path="/points" exact component={PointsListPage} />

			</section>

		</div>
		</Router>
	);
}

export default App;
