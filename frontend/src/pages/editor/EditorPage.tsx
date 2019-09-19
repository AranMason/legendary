import React from 'react';
import './EditorPage.css';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

type Props = {
	history: any
	location: {
		pathname: string,
		search: string,
		hash: string,
		state?: any
	},
	match: {
		path: string,
		url: string,
		isExact: boolean,
		params: {
			card: string
		}
	},
	staticContent?: any
}

type State = {
	isLoading: boolean,
	name: string,
	points: number,
	explanation: string,
	redirect?: string
}

class EditorPageLoader extends React.Component<Props, State>{

	constructor(props: Props){
		super(props);

		this.state = {
			isLoading: true,
			name: this.props.match.params.card,
			points: 0,
			explanation: ''
		}

		this.updateCard = this.updateCard.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		axios.get(`http://localhost:3001/points/${this.props.match.params.card}`).then((card: any) => {

			this.setState({
				name: card.data.name,
				points: card.data.points,
				explanation: card.data.explanation,
				isLoading: false
			})

		}).catch((err: any) => {
			console.error(err);
			this.setState({
				redirect: '/'
			})
		})
	}

	updateCard(){
		axios.post('http://localhost:3001/points/update', {
			name: this.state.name,
			points: this.state.points,
			explanation: this.state.explanation
		}).then(() => {
			this.setState({
				redirect: '/'
			})
		})
	}

	handleChange(e: any){
		if(e.target.name === "points"){
			this.setState({
				points: parseInt(e.target.value)
			})
		}
		else if (e.target.name === "explanation"){
			this.setState({
				explanation: e.target.value
			})
		}
	}

	render(){

		if(this.state.redirect){
			return (
				<Redirect to={this.state.redirect} />
			)
		}
		return (
			<div className="EditorPage">
				<h2>
					{this.state.name}
				</h2>
				<select name="points" value={this.state.points} onChange={this.handleChange}>
					{[0,1,2,3,4,5,6,7,8,9,10].map(point_val => {
						return (
							<option key={point_val} value={point_val}>
								{`${point_val} Points`}
							</option>
						)
					})}
				</select>
				<textarea className="EditorPage-explanation" name="explanation" value={this.state.explanation} onChange={this.handleChange}>

					</textarea>
					<button onClick={this.updateCard}>
						Submit
					</button>
			</div>
		)
	}
}

export default EditorPageLoader;