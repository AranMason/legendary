export const DecklistCards = 'DECKLIST_CARDS';

export function setDecklistPoints(payload: Array<any>) {
	return {
		type: DecklistCards,
		payload
	}
}