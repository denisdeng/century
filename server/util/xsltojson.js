'use strict';

var fs = require('fs');
require('shelljs/global');


process.argv.forEach(function (val, index, array) {
    if (index > 1) {
        xlsxj = require("xlsx-to-json");
        var arr = val.split('.');
        xlsxj({
            input: val,
            output: arr[0] + ".json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                var hash = {
                    "鞋码": "shoeSize",
                    "姓名": "name",
                    "性别": "sex",
                    "参赛号": "no",
                    "身份证号码": "cardNo",
                    "项目类别": "item",
                    "会员护照编码": "passport",
                    "服装": "suitSize"
                };
                var res = [];
                var outputFilename = arr[0] + "-bak.json";
                for (let item of result){
                    var obj = {};
                    for (var key in item){
                        obj[hash[key]] = item[key];
                    }
                    res.push(obj);
                }
                fs.writeFile(outputFilename, JSON.stringify(res, null, 4), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        //console.log("JSON saved to " + outputFilename);
                        var importData = 'mongoimport -h localhost:27017 -d century-dev -c entries --file ' + outputFilename + ' --jsonArray';
                        if(exec(importData).code != 0) {
                            echo("导入数据失败");
                            exit(1);
                        } else {
                            echo("导入数据成功");
                        }
                    }
                });
            }
        });
    }
});
