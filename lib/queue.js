const log = require('../utils/log');

const queue = [];
const maxQueueLength = 1000;

/**
 * push message
 */
exports.push = (msg) => {
    while (queue.length > maxQueueLength) {
        log.warn(`msg queue length ${queue.length} hits maxQueueLength ${maxQueueLength}, shift it!`);
        queue.shift();
    }
    queue.push(msg);
};

/**
 * get message
 */
exports.get = (userId) => {
    let obj = null;
    let length = queue.length;
    for (let i = 0; i < length; i++) {
        if (queue[i].to === userId) {
            obj = queue[i];
            queue.splice(i, 1);
            break;
        }
    }
    return obj;
};

