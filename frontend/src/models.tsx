export type Card = {
	name: string,
	points: number,
	scryfall_url: string,
	image_url: string,
	explanation: string,
	created_at: any,
	updated_at: any
}

export type Points = Array<Card>