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

/**
 * Serve Static Files from FrontEnd
 */
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

/**
 * This function uses Osmosis, a web scraping library I've used previously
 * Very quick and very easy
 *
 * Also using escapeHtml
 *
 * @param {string} url
 * @returns
 */
function getTitleTag(url) {
  return new Promise((resolve, reject) => {
    Osmosis.get(url)
      .set({
        'title': 'title'
      })
      .data((resp) => {
        resp.url = url;
        if (resp.title != null) {
          resp.title = escapeHtml(resp.title);
        } else {
          // if there is no title tag then just set the title to the url
          resp.title = url
        }
        resolve(resp)
      })
      .log(console.log)
      .error(reject)
      .debug(console.log);
  }, (err) => {
    console.log(err);
    reject();
  });
}

function isUrlsValid(urls) {
  for (let i = 0; i < urls.length; i++) {
    if (!isUrlValid) {
      return false;
    }
  }
  return true;
}

function isUrlValid(url) {
  const regEx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let match = regEx.exec(str);
  return (match[0] != null);
}

/**
 * Only real server route
 *
 * Accepts an array of strings that are urls
 */
server.route({
  method: 'POST',
  path: '/getUrlTitles',
  handler: (request, reply) => {
    if (request.payload.urls) {
      if (Array.isArray(request.payload.urls)) {
        let urls = request.payload.urls;
        if (isUrlsValid(urls)) {
          // define all the promises
          let actions = urls.map(getTitleTag);
          let results = Promise.all(actions).then((results) => {
            reply(results);
          }, (err) => {
            reply().code(500);
          });
        } else {
          reply('invalid url in array').code(400);
        }
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
