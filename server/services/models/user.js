'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    avatar: {
        type: String,
        default: ''
    },
    superior: {
        type: String,
        default: ''
    },
    department: {
        type: Array,
        default: []
    },
    roles: {
        type: Array,
        default: []
    },
    isAudit: {
        type: Boolean,
        default: false
    },
    createTime: {
        type: Date,
        default: Date.now
    }
});

/**
 *  密码加密加盐操作
 *  @params password 用户密码
 */

UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
 *  验证用户密码
 *  @params password 用户密码
 *  @params hashedPassword 用户加密处理后的密码
 */
UserSchema.statics.validatePassword = function(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
};

/**
 *  验证用户是否存在
 *  @params email 用户邮箱
 */
UserSchema.statics.checkExist = function(email) {
    return this.findOne({
        email: email
    });
};

/**
 *  用户登录验证
 *  @params email 用户邮箱
 *  @params password 用户密码
 */
UserSchema.statics.validateUser = function(email, password) {
    var self = this;
    return new Promise((resolve, reject) => {
        this.findOne({ email: email }, function(err, user) {
            if (err) {
                reject(err);
            } else if (! user) {
                resolve({
                    error: '用户名或密码错误'
                });
            } else {
                if (self.validatePassword(password, user.password)) {
                    if (user.isAudit) {
                        resolve(user)
                    } else {
                        resolve({
                            error: '账户还没通过审核'
                        })
                    }
                } else {
                    resolve({
                        error: '用户名或密码错误'
                    });
                }
            }
        })
    });
};

/**
 *  删除用户
 *  @params id 用户id
 * */
UserSchema.statics.remove = function(id) {
    return this.findByIdAndRemove(id);
};

/**
 *  修改用户密码
 *  @params {
 *      email   用户邮箱
 *      newPassword 新密码
 *  }
 */
UserSchema.statics.modifyPwd = function(content) {
    return new Promise((resolve, reject) => {
            this.update({email: content.email}, {
                $set: {
                    password: content.newPassword
                }
            }, function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
    });
};

/**
 *  获取所有用户
 *  @params condition 查询条件
 */
UserSchema.statics.query = function(condition) {
    var users = condition ? this.find(condition) : this.find();
    return users.sort({createTime: -1});
};

/**
 *  更新用户信息
 *  @params id 用户id
 *  @params key 需要更新的字段
 *  @params value 字段新值
 */
UserSchema.statics.updateUser = function(id, key, value) {
    return this.findByIdAndUpdate(id, {
        $set: {
            [key]: value
        }
    });
};

/**
 *  注册用户
 *  @params content {
 *      name        用户名
 *      password    用户密码
 *      phone       电话
 *      email       邮箱
 *  }
 */
UserSchema.statics.register = function(content) {
    var User = mongoose.model('User');
    var user = new User(content);
    return new Promise((resolve, reject) => {
        user.save((err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

module.exports = mongoose.model('User', UserSchema);