require('dotenv').config();
const crypto = require('crypto');
const digitalocean = require('./digitalocean');
const { Subdomain } = require('../database/models');

const HOST_DOMAIN = process.env.HOST_DOMAIN;
const HOST_IP = process.env.HOST_IP;

async function generate(seed) {
    const hash = crypto.createHash('sha256');
    hash.update(seed);
    return hash.digest('hex').slice(0, 8);
}

async function add(name) {
    const response = await digitalocean.domainRecords.create(HOST_DOMAIN, {
        type: 'A',
        name,
        data: HOST_IP
    });
    const subdomain = await Subdomain.create(response.domain_record);

    return subdomain.normalize();
}

async function remove(name) {
    const subdomain = await Subdomain.find({ where: { name } });

    await Promise.all([
        subdomain.destroy(),
        digitalocean.domainRecords.remove(HOST_DOMAIN, subdomain.id)
    ]);

    return subdomain.normalize();
}

exports.generate = generate;
exports.add = add;
exports.remove = remove;
