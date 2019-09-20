import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PointsListPage from './pages/points/PointsList';
import EditorPage from './pages/editor/EditorPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from './pages/admin/login/LoginPage';

import { connect } from 'react-redux';
import { loadPoints } from './actions/decklistActions'
import { getUser } from './actions/loginActions'
import { Card } from './models';


type Props = {
	loadPoints: any,
	getUser: any
}

class App extends React.Component<Props> {

	componentDidMount() {
		this.props.loadPoints();
		this.props.getUser();
	}
	render() {
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
							<Route path="/admin/login" component={LoginPage} />
							<Route path="/admin" component={AdminPage} />
							<Route path="/" component={PointsListPage} />
						</Switch>


					</section>
					<footer className="App-footer">
						Created by <a href="https://www.github.com/AranMason" rel="noopener noreferrer" target="_blank">Aran Mason</a>.
						<div>This site uses <a href="https://fontawesome.com/license" rel="noopener noreferrer" target="_blank">Font Awesome Icons</a></div>
					</footer>
				</div>

			</Router>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		loadPoints: () => dispatch(loadPoints()),
		getUser: () => dispatch(getUser())
	}
}

export default connect(null, mapDispatchToProps)(App);
