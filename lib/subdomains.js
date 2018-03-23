const digitalocean = require('./digitalocean');
const { Subdomain } = require('../database/models');

const HOST_DOMAIN = process.env.HOST_DOMAIN;
const HOST_IP = process.env.HOST_IP;

async function add(name) {
    const response = await digitalocean.domainRecords.create(HOST_DOMAIN, {
        type: 'A',
        name: name,
        data: HOST_IP
    });
    return Subdomain.create(response.domain_record);
}

async function remove(name) {
    const subdomain = await Subdomain.find({ where: { name } });
    await subdomain.destroy();
    return digitalocean.domainRecords.remove(HOST_DOMAIN, subdomain.id);
}

exports.add = add;
exports.remove = remove;
