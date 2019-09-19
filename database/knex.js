const pg = require('knex')({
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING
});

module.exports = {
	knex: pg,
	create: () => {

		pg.schema.hasTable('points').then(exists => {

			if(!exists){
				pg.schema.createTable('points', function(table) {
					// table.increments();
					table.string('name').primary();
					table.integer('points');
					table.string('scryfall_url');
					table.string('image_url');
					table.text('explanation', 'longtext');
					table.timestamps(true, true);
				}).then()
			}
			else {
				// console.log('Table')
			}

		})

	},

	reset: () => {
		pg.schema.dropTable('points').then();
	}
};