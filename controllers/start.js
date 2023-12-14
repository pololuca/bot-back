const startData = require('../data/start.json');


exports.start = async (req, res) => {
    res.json(startData);
}