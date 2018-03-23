exports.up = (database, DataTypes) => {
    return database.createTable('subdomains', {
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
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
};

exports.down = (database, DataTypes) => {
    return database.dropTable('subdomains');
};
