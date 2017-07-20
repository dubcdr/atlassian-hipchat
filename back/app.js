const Hapi = require('hapi');
const Path = require('path');
const Osmosis = require('osmosis');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});
server.connection({ port: 2500, host: 'localhost' });

server.register(require('inert'), (err) => {
  if (err) {
        throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            index: true,
            redirectToSlash: true
        }
    },
  });
})

server.route({
    method: 'GET',
    path: '/getUrlTitle',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});


server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
