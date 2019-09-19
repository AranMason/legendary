const pg = require('knex')({
	client: 'pg',
	connection: process.env.DATABASE_URL
});

module.exports = {
	knex: pg,
	create: () => {

		pg.schema.createTableIfNotExists('points', (table) => {
			// table.increments();
			table.string('name');
			table.integer('points').defaultTo(0);
			table.string('scryfall_url').notNullable();
			table.string('image_url').notNullable();
			table.text('explanation', 'longtext').notNullable();
			table.timestamps(true, true);
		}).then()

		pg.schema.createTableIfNotExists('blogs', (table) => {
			table.uuid('id').primary();
			table.string('title');
			table.text('post', 'longtext').notNullable();
			table.uuid('author').references('users.id').onUpdate('CASCADE').onDelete('SET NULL');
			table.boolean('published').defaultTo(false).notNullable();
			table.timestamps(true, true)
		}).then();

		pg.schema.createTableIfNotExists('users', (table) => {
			table.uuid('id').primary();
			table.string('username').notNullable().unique();
			table.string('email').notNullable().unique();
			table.string('password').notNullable();
			table.timestamp('created_at').defaultTo(pg.fn.now());
			table.string('account_type').defaultTo('USER');
		}).then()

	},

	reset: () => {
		pg.schema.dropTable('points').then();
		pg.schema.dropTable('blogs').then();
		pg.schema.dropTable('users').then();
	}
};