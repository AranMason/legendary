export const DecklistCards = 'DECKLIST_CARDS';

export function setDecklistPoints(payload: Array<any>) {

	console.log("Firing Action: ", payload)

	return {
		type: DecklistCards,
		payload
	}
}