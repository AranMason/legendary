import axios from 'axios';

export const GetUser = 'GET_USER';
export const ClearUser = 'CLEAR_USER';
export const RetrievingUser = 'RETRIEVING_USER';

export function getUser(){
	return (dispatch: any) => {

		dispatch({
			type: RetrievingUser
		})

		axios.get('http://localhost:3001/users').then(user => {
			dispatch({
				type: GetUser,
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