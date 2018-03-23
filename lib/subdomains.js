const digitalocean = require('./digitalocean');

const HOST_DOMAIN = process.env.HOST_DOMAIN;
const HOST_IP = process.env.HOST_IP;

function add(name) {
    return digitalocean.domainRecords.create(HOST_DOMAIN, {
        type: 'A',
        name: name,
        data: HOST_IP
    });
}

function remove(id) {
    return digitalocean.domainRecords.remove(HOST_DOMAIN, id);
}

exports.add = add;
exports.remove = remove;
