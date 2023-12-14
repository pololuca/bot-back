const log = require('./log');

module.exports = (req, res, data) => {
    setTimeout(() => {
        var callback = req.query.callback;
        if (callback) {
            var resStr = JSON.stringify(data);
            resStr = resStr.substr(1, resStr.length - 2);
            // log.info(`/**/${callback}({${resStr}})`);
            res.setHeader('content-type', 'application/javascript;charset=utf-8');
            res.end(`/**/${callback}({${resStr}})`);
        } else {
            res.json(data);
        }
    }, 100);
}