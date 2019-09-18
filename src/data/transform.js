const points = require('./points_list.json');
const fs = require('fs');

const axios = require('axios');

let newPoints = {
	cards: []
}

cardNames = Object.keys(points).sort().filter(card => {
	return points[card] > 0;
});



async function test(){

	console.log("Creating Card List")

	for (element in cardNames ){

		const url = `https://api.scryfall.com/cards/named?fuzzy=${cardNames[element]}`

		try {
			const res = await axios.get(url)

			console.log(`Processing: ${cardNames[element]}`);

			newPoints.cards.push({
				name: res.data.name,
				points: points[cardNames[element]],
				image_url: res.data.image_uris.normal,
				// scryfall: res.data,
				scryfall_uri: res.data.scryfall_uri,
				explanation: "TO BE ADDED",
				date_created: Date.now(),
				last_updated: Date.now()
			})
		} catch(err){
			console.error(err);
		}

	}

	fs.writeFile('new_points.json', JSON.stringify(newPoints, null, 2), (err) => {
		console.error(err);
	})
}

test();



