'use strict';

var mongoose = require('mongoose');

var ReportSchema = mongoose.Schema({
    //姓名
    name: String,
    //性别
    sex: {
        type: String,
        enum: ['男', '女']
    },
    //参赛号码
    no: String,
    //成绩
    score: String,
    //净计时
    netTiming: String,
    //配速
    pace: String,
    //性别总人数
    sexTotal: String,
    //性别排名
    sexRankScore: String,
    //性别净计时排名
    sexRankNetTiming: String,
    //总人数
    total: String,
    //总排名
    rankScore: String,
    //净计时总排名
    rankNetTiming: String
});


ReportSchema.statics.add = function(content) {
    var Report = mongoose.model('Entry');
    var report = new Report(content);
    return new Promise((resolve, reject) => {
        entry.save((err, report) => {
            if (err) {
                reject(err);
            } else {
                resolve(report);
            }
        });
    });
};

ReportSchema.statics.getScore = function(condition) {
    var scores = condition ? this.find(condition) : this.find();
    return scores;
};

module.exports = mongoose.model('Report', ReportSchema);
