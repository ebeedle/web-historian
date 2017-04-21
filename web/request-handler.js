var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!



exports.handleRequest = (req, res) => {
  // var urlPath = url.path();
  // var file = path.join(archive.paths.siteAssets, '../public/index.html')
  // console.log(typeof req.method)
  console.log('Request type is', req.method, ' and the req URL is ', req.url);

  if (req.method === 'GET' ) {
    var urlPath = url.parse(req.url).pathname;
    if (req.url === '/') { 
      urlPath = '/index.html'; 
    }

    helpers.serveAssets(res, urlPath, () => {
      if (urlPath[0] === '/') {
        urlPath = urlPath.slice(1);
      }

      archive.isUrlInList(urlPath, found => {
        found ? helpers.sendRedirect(res, '/loading.html') : helpers.send404(res);
      });
    }); 
  }

  if (req.method === 'POST') {
    // ------------OG code--------------
    // req.on('data', data => {
    //   archive.addUrlToList(data.toString().slice(4) + '\n', (url) => {
    //     res.writeHead(302, {'Content-type': 'text/html'});
    //     res.end(url);
    //   });
    // });
    // res.end('posted yo') 

    helpers.collectData(req, data => {
      var url = data.split('=')[1].replace('http://', '');
      archive.isUrlInList(url, found => {
        if (found) { 
          archive.isUrlArchived(url, exists => {
            if (exists) {
              helpers.sendRedirect(res, '/' + url);
            } else {
              helpers.sendRedirect(res, '/loading.html');
            }
          });
        } else { 
          archive.addUrlToList(url + '\n', () => {
            helpers.sendRedirect(res, '/loading.html');
          });
        }
      });
    });
  }

};
