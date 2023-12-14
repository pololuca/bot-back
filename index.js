const express = require('express');
const cors = require('cors')
const https = require('https');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const reload = require('reload');
const watch = require('watch');
const fs = require('fs');

const log = require('./utils/log');
const routes = require('./routes');



// initialize the express app
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/pages');
app.set('view engine', 'html');
app.disable('view cache');

app.use(morgan('dev'));
app.use('/public', express.static('./public'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use((req, res, next) => {
  // Access-Control-Allow-Credentials: true
  // Access-Control-Allow-Headers: origin,accept,x-requested-with,content-type,authorization,access-control-request-method,access-control-request-headers
  // Access-Control-Allow-Methods: POST
  // Access-Control-Allow-Origin: https://mylocal.qa.ebay.com:9000
  // Access-Control-Max-Age: 86400
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'origin,accept,x-requested-with,content-type,authorization,access-control-request-method,access-control-request-headers');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || req.headers.referer || '*');
  res.setHeader('Access-Control-Max-Age', 86400);
  next();
});
app.use(routes)

app.use((err, req, res, next) => {
  log.error(err);
  res.status(err.status || 500);
  res.end('Server inner error!');
})


reload(app, {
  port: 9859,
  https: {
    certAndKey: {
      key: './cert/privkey1.pem',
      cert: './cert/cert1.pem'
    }
  },
}).then((reloadReturned) => {
  // auto refresh browser
  watch.watchTree(__dirname + "/pages", function (f, curr, prev) {
    // Fire server-side reload event
    reloadReturned.reload();
  });
}).then(() => {
  // start HTTPS server
  var httpsServer = https.createServer({
    key: fs.readFileSync('./cert/privkey1.pem'),
    cert: fs.readFileSync('./cert/cert1.pem')
  }, app);
  var httpsPort = 4443;

  httpsServer.listen(httpsPort, error => {
    if (error) {
      log.error('HTTPS Server error:', error);
    } else {
      log.info(`HTTPS Server listening on port ${httpsServer.address().port}`);
    }
  });

  // // start HTTP server
  // var httpServer = http.createServer(app);
  // var httpPort = 80;

  // httpServer.listen(httpPort, error => {
  //   if (error) {
  //     log.error('HTTPS Server error:', error);
  //   } else {
  //     log.info(`HTTPS Server listening on port ${httpServer.address().port}`);
  //   }
  // });
})
