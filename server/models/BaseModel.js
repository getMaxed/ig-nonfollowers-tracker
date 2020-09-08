const objection = require('objection');

module.exports = class BaseModel extends objection.Model {
    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
};
