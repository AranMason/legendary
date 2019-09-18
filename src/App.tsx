import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import PointsListPage from './pages/PointsList';

const App: React.FC = () => {
	return (
		<Router>
		<div className="App">
			<header className="App-header">
				<h1>
					Legendary Commander
				</h1>
			
      </header>
			<section className="App-body">
					<Route path="/" component={PointsListPage} />
					<Route path="/points" exact component={PointsListPage} />

			</section>

		</div>
		<footer className="App-footer">
			Created by Aran Mason.
			<div>This site uses <a href="https://fontawesome.com/license">Font Awesome Icons</a></div>
		</footer>
		</Router>
	);
}

export default App;
