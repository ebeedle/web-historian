var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  // console.log('DATA--------', data)
  response.writeHead(statusCode, helpers.headers);
  response.end(data);
};

exports.handleRequest = function (req, res) {
  // var urlPath = url.path();
  // var file = path.join(archive.paths.siteAssets, '../public/index.html')
  // console.log(typeof req.method)
  console.log('Request type is', req.method, ' and the req URL is ', req.url);

  if (req.method === 'GET' ) {
    if (req.url === '/') {  
      fs.readFile(__dirname + '/public/index.html', function(err, data) {
        if (err) {
          throw err;
        }
        res.writeHead(200, {'Content-type': 'text/html'});
        // res.write(data);
        res.end(data.toString());
      });
      // helpers.serveAssets(res, req.url, (err, data) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log('---------------ABOUT TO SEND RESPONSE')
      //     sendResponse(res, data);
      //   }
      // });
    } 
  }

  if (req.method ==='POST') {
    req.on('data', data => {
      archive.addUrlToList(data.toString().slice(4) + '\n', (url) => {
        res.writeHead(302, {'Content-type': 'text/html'});
        res.end(url);
      });
    });
    // res.end('posted yo') 
  }
  // console.log(file);
  // var html;

  // fs.readFile(file, function (err, data) {
  //   if (err) {
  //     // handle error
  //     throw err;
  //   } else {
  //     html = data.toString();
  //     // now $html is a jQuery object
  //     sendResponse(res, html);
  //   }
  // });

// console.log('sldkfjsdkjfl');
  // res.end('do something!');
};
