require('dotenv').config();
const { to } = require('await-to-js');
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

async function start() {
    const [ err ] = await to(server.start());

    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Server is running:', server.info.uri);
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

start();
