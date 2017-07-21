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
function getUrl(url) {
  const urlRegEx = new RegExp('(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?');
  return new Promise((resolve, reject) => {
    if (urlRegEx.exec(url)[0] != null) {
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
        .error(reject)
        .debug(console.log);
    }
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
  const regEx = new RegExp('(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?', 'g');
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
          let actions = urls.map(getUrl);
          let results = Promise.all(actions).then((results) => {
            reply(results);
          }, (err) => {
            console.log('error');
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
