import axios from 'axios';

export const DecklistCards = 'DECKLIST_CARDS';
export const LoadPoints = 'LOAD_POINTS'

export function setDecklist(payload: Array<any>) {
	return {
		type: DecklistCards,
		payload
	}
}

// export function loadPoints(payload: Array<any>) {
// 	return {
// 		type: LoadPoints,
// 		payload
// 	}
// }

export function loadPoints(){
	return (dispatch: any) => {
		axios.get('http://localhost:3001/points').then((res) => {
				dispatch({
					type:LoadPoints,
					payload: res.data
				})
			}).catch(err => {
				console.error(err);
			})
	}
}

