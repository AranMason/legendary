import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PointsListPage from './pages/points/PointsList';
import EditorPage from './pages/editor/EditorPage';

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
				<Switch>
					<Route path="/edit/:card" component={EditorPage} />
					<Route path="/" component={PointsListPage} />
				</Switch>


			</section>
			<footer className="App-footer">
			Created by Aran Mason.
			<div>This site uses <a href="https://fontawesome.com/license">Font Awesome Icons</a></div>
		</footer>
		</div>

		</Router>
	);
}

export default App;
