const express = require('express');
const multer = require('multer');
const startCtrl = require('./controllers/start')
const interactCtrl = require('./controllers/interact');

const rootRouter = express.Router();


rootRouter.post('/bot/v1/start', startCtrl.start);
rootRouter.post('/bot/v1/interact', interactCtrl.interact);

function noop (req, res) {
    res.end();
}

module.exports = rootRouter