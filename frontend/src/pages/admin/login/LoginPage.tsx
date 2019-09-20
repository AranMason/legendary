import React from 'react';
import './LoginPage.css';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../../../actions/loginActions';

type Props = {
	login: (username: string, password: string) => any,
	user: any
}

type State = {
	username: {
		value: string,
		valid?: boolean
	}
	password: {
		value: string,
		valid?: boolean
	}
}

class LoginPage extends React.Component<Props, State> {

	constructor(props: Props){
		super(props);

		this.state = {
			username: {
				value: ''
			},
			password: {
				value: ''
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange(e: any){
		e.preventDefault();

		const target = e.target.name;

		if(target === "username"){
			this.setState({
				username: {
					value: e.target.value,
					// valid: e.target.value.length > 5
				}
			})
		} else if (target === "password"){
			this.setState({
				password: {
					value: e.target.value,
					// valid: e.target.value.length > 6
				}
			})
		}
	}

	handleSubmit(e: any){
		e.preventDefault()

		this.props.login(this.state.username.value, this.state.password.value);
	}

	render(){
		if(this.props.user){
			return (
				<Redirect to='/admin' />
			)
		}
		return (
			<div className="LoginPage">
				<form onSubmit={this.handleSubmit}>
					<h2>
						Login
					</h2>
					<div className="LoginPage-form-row">
						<h3>
							Username:
						</h3>
						<input name="username" value={this.state.username.value} onChange={this.handleChange} type="text" placeholder="Username"></input>
					</div>
					<div className="LoginPage-form-row">
						<h3>
							Password:
						</h3>
						<input name="password" value={this.state.password.value} onChange={this.handleChange} type="password" placeholder="Password"></input>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		user: state.login.user
	}
}

const mapDispatchToProps = (dispatch: (func: any) => any) => {
	return {
		login: (username: string, password: string) => dispatch(login(username, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)