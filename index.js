require('dotenv').config();
const hapi = require('hapi');

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

function handleError(err) {
    console.error(err);
    process.exit(1);
}

async function start() {
    process.on('unhandledRejection', handleError);

    await server.start().catch(handleError);
    console.log('Server is running:', server.info.uri);
}

start();
