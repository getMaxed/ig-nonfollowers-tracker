const objection = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const faker = require('faker');
const { Example } = require('../models/Example');

objection.Model.knex(Knex(knexConfig[process.env.NODE_ENV]));

async function seedExamples() {
    try {
        await Example.query().insert({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone_number: faker.phone.phoneNumber()
        });
    } catch (err) {
        console.log('Error seeding example:', err.error);
    }
}

exports.seed = async () => {
    await Example.query().delete();

    for (let i = 0; i < 8; i++) {
        await seedExamples();
    }
};
