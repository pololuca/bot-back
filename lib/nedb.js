const NeDB = require('nedb');
const log = require('../utils/log');

const dbFilePath = './db/ne.db';
let nedb;

exports.initNeDB = () => {
    return new Promise((resolve, reject) => {
        nedb = exports.nedb = new NeDB({ filename: dbFilePath });
        nedb.loadDatabase((err) => {
            if (err) {
                reject(err);
            } else {
                log.info('NeDB ready.');
                resolve();
            }
        })
    })
}

exports.insert = (doc) => {
    return new Promise((resolve, reject) => {
        nedb.insert(doc, (err, newDoc) => {
            err ? reject(err) : resolve(newDoc);
        })
    })
}

exports.find = (query, projections) => {
    return new Promise((resolve, reject) => {
        projections ? 
        nedb.find(query, projections, (err, docs) => {
            err ? reject(err) : resolve(docs);
        }) :
        nedb.find(query, (err, docs) => {
            err ? reject(err) : resolve(docs);
        })
    })
}

exports.findOne = (query, projections) => {
    return new Promise((resolve, reject) => {
        projections ?
        nedb.findOne(query, projections, (err, docs) => {
            err ? reject(err) : resolve(docs);
        }) :
        nedb.findOne(query, (err, docs) => {
            err ? reject(err) : resolve(docs);
        })
    })
}

exports.update = (query, update, options) => {
    return new Promise((resolve, reject) => {
        options ? 
        nedb.update(query, update, options, (err, numAffected, affectedDocuments, upsert) => {
            err ? reject(err) : resolve(numAffected, affectedDocuments, upsert);
        }) :
        nedb.update(query, update, (err, numAffected, affectedDocuments, upsert) => {
            err ? reject(err) : resolve(numAffected, affectedDocuments, upsert);
        })
    })
}

exports.remove = (query, options) => {
    return new Promise((resolve, reject) => {
        options ? 
        nedb.remove(query, options, (err, numRemoved) => {
            err ? reject(err) : resolve(numRemoved);
        }) :
        nedb.remove(query, (err, numRemoved) => {
            err ? reject(err) : resolve(numRemoved);
        })
    })
}