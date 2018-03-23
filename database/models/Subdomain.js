module.exports = (database, DataTypes) => {
    return database.define('subdomain', {
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
};
