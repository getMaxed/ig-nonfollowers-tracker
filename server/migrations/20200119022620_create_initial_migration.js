exports.up = knex => {
    return knex.schema.createTable('example', table => {
        table.increments('id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('phone_number');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
    });
};
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('example');
};
