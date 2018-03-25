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

function handleError(err) {
    console.error(err);
    process.exit(1);
}

async function initialize() {
    process.on('unhandledRejection', handleError);

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: process.env.NODE_ENV !== 'production'
        }
    });

    await server.start().catch(handleError);
    console.log('Server is running:', server.info.uri);
}

initialize();
