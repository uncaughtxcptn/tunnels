require('dotenv').config();
const path = require('path');
const hapi = require('hapi');
const pick = require('lodash/pick');
const subdomains = require(process.env.SUBDOMAIN_LIB_PATH);

const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST_DOMAIN = process.env.HOST_DOMAIN;

function handleError(err) {
    console.error(err);
    process.exit(1);
}

async function initialize() {
    const server = hapi.server({
        host: 'localhost',
        port: process.env.PORT,
        routes: {
            files: {
                relativeTo: path.resolve(__dirname, 'public')
            }
        }
    });

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: NODE_ENV !== 'production'
        }
    });

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/',
        vhost: HOST_DOMAIN,
        handler(request, h) {
            return h.file('index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/{asset*}',
        vhost: HOST_DOMAIN,
        handler: {
            directory: {
                path: path.resolve(__dirname, 'public/assets')
            }
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

    await server.start().catch(handleError);
}

process.on('unhandledRejection', handleError);

initialize();
