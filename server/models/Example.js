const BaseModel = require('./BaseModel');

exports.Example = class Example extends BaseModel {
    static get tableName() {
        return 'example';
    }

    $beforeInsert() {
        //
    }

    static get jsonSchema() {
        return {
            required: ['first_name', 'last_name'],
            properties: {
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                phone_number: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        //
    }
};
