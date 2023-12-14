const buttons = require('../data/buttons.json');
const news = require('../data/news.json');
const weather = require('../data/weather.json');
const stopThis = require('../data/stop.json');
const startContactUsData = require('../data/start.json');

exports.interact = async (req, res) => {
    switch (req.body.queryInput) {
        case 'start':
            return res.json(startContactUsData);
        case 'buttons':
            return res.json(buttons);
        case 'Tell me some news':
            return res.json(news);
        case 'What is the weather like?':
            return res.json(weather);
        case 'Stop this':
            return res.json(stopThis);

    }
    return setTimeout(() => res.json(buttons), 500);
}