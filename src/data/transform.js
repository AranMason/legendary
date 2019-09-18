const points = require('./points_list.json');
const fs = require('fs');

const axios = require('axios');

let newPoints = {
	cards: []
}

cardNames = Object.keys(points);



async function test(){

	console.log("Creating Card List")

	for (element in cardNames ){

		console.log(element)

		const url = `https://api.scryfall.com/cards/named?fuzzy=${cardNames[element]}`

		try {
			const res = await axios.get(url)

			// console.log(res.data);

			newPoints.cards.push({
				name: cardNames[element],
				points: points[cardNames[element]],
				// image_url: "",
				scryfall: res.data,
				explaination: "Added from the Candian Highlander Points list initially for the creation of the points list",
				changes: {
					date_created: Date.now(),
					last_updated: Date.now()
				}
			})
		} catch(err){
			console.error(err);
		}

	}

	console.log(newPoints);

	fs.writeFile('new_points.json', JSON.stringify(newPoints, null, 2), (err) => {
		console.error(err);
	})
}

test();

// cardNames.forEach(async element => {


// })



