require('dotenv').config();
const hapi = require('hapi');
const pick = require('lodash/pick');
const subdomains = require(process.env.SUBDOMAIN_LIB_PATH);

const HOST_DOMAIN = process.env.HOST_DOMAIN;

const server = hapi.server({
    host: 'localhost',
    port: process.env.PORT
});

server.route({
    method: 'GET',
    path: '/',
    vhost: HOST_DOMAIN,
    handler(request, h) {
        const name = extractSubdomain(request.info.hostname) || 'hapi';
        return `hello ${name}!`;
    }
});

server.route({
    method: 'POST',
    path: '/tunnels',
    vhost: HOST_DOMAIN,
    async handler(request, h) {
        const seed = request.info.remoteAddress + ':' + request.info.remotePort;
        const name = await subdomains.generate(seed);
        const subdomain = await subdomains.add(name);

        return pick(subdomain, ['address']);
    }
});

server.route({
    method: '*',
    path: '/{p*}',
    vhost: HOST_DOMAIN,
    async handler(request, h) {
        return 'handling...';
    }
});

server.route({
    method: '*',
    path: '/{p*}',
    async handler(request, h) {
        return `test response for ${request.info.hostname}${request.path}`;
    }
});

function extractSubdomain(host) {
    const segments = host.split('.');
    return segments.length > 2
        ? segments.slice(0, segments.length - 2).join('.')
        : null;
}

module.exports = server;
