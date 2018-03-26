const { Subdomain } = require('../../database/models');

async function generate(seed) {
    return 'example';
}

async function add(name) {
    const subdomain = await Subdomain.create({
        id: 12345,
        name: name,
        data: '127.0.0.1',
        ttl: 1800
    });

    return subdomain.normalize();
}

async function remove(name) {
    const subdomain = await Subdomain.find({ where: { name } });
    await subdomain.destroy();

    return subdomain.normalize();
}

exports.generate = generate;
exports.add = add;
exports.remove = remove;
