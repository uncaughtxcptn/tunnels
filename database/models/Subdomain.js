require('dotenv').config();
const pick = require('lodash/pick');


module.exports = (database, DataTypes) => {
    const Subdomain = database.define('subdomain', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ttl: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    Subdomain.prototype.normalize = function() {
        return {
            ...pick(this, ['id', 'name', 'data', 'ttl']),
            address: this.name + '.' + process.env.HOST_DOMAIN
        };
    };

    return Subdomain;
};
