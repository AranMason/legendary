import axios from 'axios';

export const LoginUser = 'LOGIN_USER';
export const ClearUser = 'CLEAR_USER';
export const RetrievingUser = 'RETRIEVING_USER';

export function getUser(){
	return (dispatch: any) => {

		dispatch({
			type: RetrievingUser
		})

		axios.get('http://localhost:3001/users').then(user => {
			dispatch({
				type: LoginUser,
				user
			})
		}).catch(err => {
			console.error(err.message);
			dispatch({
				type: ClearUser
			})
		})
	}
}

export function login(username: string, password: string){
	return (dispatch: any) => {
		dispatch({
			type: RetrievingUser
		})

		axios.post('http://localhost:3001/users/login', {
			username,
			password
		}).then(res => {
			dispatch({
				type: LoginUser,
				user: res.data
			})
		}).catch(err => {
			console.error(err.message);
			dispatch({
				type: ClearUser
			})
		})
	}
}