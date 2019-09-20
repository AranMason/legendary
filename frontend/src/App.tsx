import React from 'react';
import './App.css';

import axios from 'axios';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PointsListPage from './pages/points/PointsList';
import EditorPage from './pages/editor/EditorPage';
import AdminPage from './pages/admin/AdminPage';

import { connect } from 'react-redux';
import { loadPoints } from './actions/decklistActions'
import { getUser } from './actions/loginActions'
import { Card } from './models';


type Props = {
	loadPoints: any,
	getUser: any
}

class App extends React.Component<Props> {

	componentDidMount(){
		axios.get('http://localhost:3001/points').then((res: {
			data: Array<Card>
		}) => {
			this.props.loadPoints(res.data);
		}).catch(err => {
			console.error(err);
		})

		this.props.getUser();
	}
	render(){
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
					<Route path="/admin/login" component={AdminPage} />
					<Route path="/admin" component={AdminPage} />
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
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		loadPoints: (decklist: Array<Card>) => dispatch(loadPoints(decklist)),
		getUser: () => dispatch(getUser())
	}
}

export default connect(null, mapDispatchToProps)(App);
