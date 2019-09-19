import { DecklistCards } from '../actions/decklistActions';

const defaultState = {
	decklist: []
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
		default: {
			return state
		}
	}

}