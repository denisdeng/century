'use strict';

module.exports = {

    /**
     * 应用Id (统一使用小写英文或者数字或者中划线)
     */
    id: 'entry',

    /**
     * App名称
     */
    name: '报名信息',

    /**
     * 应用路由
     */
    router: require('./router'),

    /**
     * 是否启用此应用
     */
    enable: true

};
