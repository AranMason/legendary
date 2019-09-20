export const DecklistCards = 'DECKLIST_CARDS';
export const LoadPoints = 'LOAD_POINTS'

export function setDecklist(payload: Array<any>) {
	return {
		type: DecklistCards,
		payload
	}
}

export function loadPoints(payload: Array<any>) {
	return {
		type: LoadPoints,
		payload
	}
}