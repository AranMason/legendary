var express = require('express');
var router = express.Router();

var knex = require('../database/knex').knex;

function valiadateCard (req, res, next){

	if(req.body.name &&
		req.body.points &&
		req.body.scryfall_url &&
		req.body.image_url &&
		req.body.explanation){
			next();
		} else {

			res.status(500).json({
				message: "Missing items from the request body"
			})

		}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('points').select().orderBy('name', 'asc').then(db_res => {
	  res.status(200).json(db_res);
  })
});

router.post('/update', (req, res, next) => {

	knex('points').where({
		name: req.body.name
	}).update({
		...req.body,
		updated_at: knex.fn.now()
	}).then(arg => {

		res.status(200).json({
			status: 200,
			message: "Successfully updated " + req.body.name
		})

	}).catch(err => {
		res.status(500).json({
			status: 500,
			message: err.message
		})
	})
})

router.post('/', valiadateCard, (req, res, next) => {
	knex('points').insert({...req.body}).then(() => {
		res.status(200).json({
			status: 200,
			message: `Succesfully added ${req.body.name}`
		})
	}).catch(err => {
		res.status(500).json({
			status: 500,
			message: err.message
		})
	})
})

module.exports = router;
