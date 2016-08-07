'use strict';

var mongoose = require('mongoose');
var mongo = require('../../../mongodb');

var EntrySchema = mongoose.Schema({
    //姓名
    name: String,
    //性别
    sex: {
        type: String,
        enum: ['男', '女']
    },
    //参赛号码
    no: String,
    //身份证号
    cardNo: String,
    //护照
    passport: String,
    //项目类别
    item: String,
    //鞋子尺寸
    shoeSize: String,
    //衣服尺寸
    suitSize: String
});


EntrySchema.statics.add = function(content) {
    var Entry = mongoose.model('Entry');
    var entry = new Entry(content);
    return new Promise((resolve, reject) => {
        entry.save((err, entry) => {
            if (err) {
                reject(err);
            } else {
                resolve(entry);
            }
        });
    });
};

EntrySchema.statics.getUser = function(condition) {
    return this.find(condition || {});
};

module.exports = mongoose.model('Entry', EntrySchema);
