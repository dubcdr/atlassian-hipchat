const Hapi = require('hapi');
const Path = require('path');
const http = require('http');
const Osmosis = require('osmosis')
const escapeHtml = require('escape-html');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});
server.connection({
  port: 2500,
  host: 'localhost'
});

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

function getUrl(url) {
  // console.log(`start of getUrl for ${url}`)
  return new Promise((resolve, reject) => {
    Osmosis.get(url)
      .set({
        'title': 'title'
      })
      .data((resp) => {
        resp.url = url;
        resp.title = escapeHtml(resp.title);
        resolve(resp)
      })
      .log(console.log)
      .error(console.log)
      .debug(console.log);
  });
}

server.route({
  method: 'POST',
  path: '/getUrlTitle',
  handler: (request, reply) => {
    if (request.payload.urls) {
      if (Array.isArray(request.payload.urls)) {
        let urls = request.payload.urls;
        let actions = urls.map(getUrl);
        console.log('actions: ', actions)
        let results = Promise.all(actions);
        results.then(console.log);
        reply(results);
      } else {
        reply('payload must contain urls and be an array').code(400);
      }
    } else {
      reply('no url');
    }
  }
});


server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
