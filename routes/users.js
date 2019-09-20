var express = require('express');
var router = express.Router();

var uuid = require('uuid/v4');
var bcrypt = require('bcryptjs');

const saltRounds = 10;

var knex = require('../database/knex').knex;

function getUser(){
	return knex('users').select('id', 'username', 'email', 'created_at', 'account_type')
}

function hashPassword(password){
	return new Promise((resolve, reject) => {

		try {
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(password, salt);

			resolve(hash);
		} catch (err) {
			reject(err);
		}

	})
}

//Validate that the gives account username/password is appropriate.
function validateCredentials(req, res, next){

	var { username, email, password} = req.body

	if(!username && !email){
		res.status(500).json({
			status: 500,
			message: "Invalid request"
		})
	}
	else if (!password){
		res.status(500).json({
			status: 500,
			message: "Invalid request"
		})
	}
	else {
		next();
	}
}

router.post('/login', validateCredentials, (req, res, next) => {
	const password = req.body.password;

	knex('users').select('*').where({
		username: req.body.username
	}).orWhere({
		email: req.body.username
	}).then(response => {

		const user = response[0];

		if(bcrypt.compare(password, user.password)) {
			req.session.user = {
				username: user.username,
				email: user.email,
				account_type: user.account_type,
				id: user.id,
				created_at: user.created_at
			}

			req.cookies;

			console.log(req.session, req.cookies);

			res.status(200).json(req.session.user);
		}
		else {
			res.status(500).json({
				status: 500,
				message: "Invalid Username or Password"
			})
		}

	}).catch(err => {
		res.status(500).json({
			status: 500,
			message: "Invalid Username or Password 2",
			error: err
		})
	})
})

router.post('/create', validateCredentials, (req, res, next) => {
	hashPassword(req.body.password).then(hash => {

		const user = {
			id: uuid(),
			username: req.body.username,
			email: req.body.email,
			password: hash
		}

		knex('users').insert(user).then(() => {

			getUser().where(user.id).then(db_res => {
				req.session.user = db_res[0];

				res.status(200).json({
					status: 200,
					message: "Account Created"
				});

			}).catch(err => {
				res.status(500).json({
					status: 500,
					message: "Failed to find user",
					error: err
				})
			})


		}).catch(err => {
			res.status(500).json({
				status: 500,
				message: "Failed to save user",
				error: err
			});
		})
	}).catch(err => {
		res.status(500).json({
			status: 500,
			message: "Failed to create account",
			error: err
		});
	})
})

router.get('/', (req, res, next) => {

	console.log(req.session);

	if(req.session.user){
		res.status(200).json(
			req.session.user
		)
	}
	else (
		res.status(400).send({
			status: 400,
			message: "Not logged in"
		})
	)
})

module.exports = router;