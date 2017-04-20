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
  // console.log('REQUEST URL----------', req.url)
  if (req.method === 'GET') {

    helpers.serveAssets(res, req.url, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        sendResponse(res, data);
      }
    });

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


  // res.end('do something!');
};
