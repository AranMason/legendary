const points = require('./points_list.json');
const fs = require('fs');
let newPoints = {
	cards: []
}

cardNames = Object.keys(points);

cardNames.forEach(element => {
	newPoints.cards.push({
		name: element,
		points: points[element]
	})
});

console.log(newPoints);

fs.writeFile('new_points.json', JSON.stringify(newPoints, null, 2), (err) => {
	console.error(err);
})