import { DecklistCards , LoadPoints } from '../actions/decklistActions';

const defaultState = {
	decklist: [],
	points: []
}

export default (state = defaultState, action: {
	type: string,
	payload: any
}) => {

	switch (action.type) {
		case DecklistCards:
			return {
				...state,
				decklist: action.payload
			}
		case LoadPoints:
			return {
				...state,
				points: action.payload
			}
		default: {
			return state
		}
	}

}