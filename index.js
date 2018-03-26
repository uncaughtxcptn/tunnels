require('dotenv').config();
const hapi = require('hapi');
const pick = require('lodash/pick');
const subdomains = require(process.env.SUBDOMAIN_LIB_PATH);

const server = hapi.server({
    host: 'localhost',
    port: process.env.PORT
});

server.route({
    method: 'GET',
    path: '/',
    handler(request, h) {
        const name = extractSubdomain(request.info.hostname) || 'hapi';
        return `hello ${name}!`;
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

function extractSubdomain(host) {
    const segments = host.split('.');
    return segments.length > 2
        ? segments.slice(0, segments.length - 2).join('.')
        : null;
}

module.exports = server;
