require('dotenv').config();
const hapi = require('hapi');
const pick = require('lodash/pick');
const subdomains = require('./lib/subdomains');

const server = hapi.server({
    host: 'localhost',
    port: process.env.PORT
});

server.route({
    method: 'GET',
    path: '/',
    handler(request, h) {
        return 'hello hapi!';
    }
});

server.route({
    method: 'POST',
    path: '/tunnels',
    async handler(request, h) {
        const seed = request.info.remoteAddress + ':' + request.info.remotePort;
        const name = await subdomains.generate(seed);
        const subdomain = await subdomains.add(name);

        return pick(subdomain, ['address']);
    }
});

module.exports = server;
