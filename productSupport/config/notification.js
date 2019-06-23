var app = require('express')();
var www = require('../bin/www')


var Notification = require('../models/Notifction');

module.exports = {
    addNotifction: function (name, sendBy, sendTo, event) {
        let newNotification = new Notification();
        newNotification.name = name;
        newNotification.sendBy = sendBy;
        newNotification.sendTo = sendTo;
        newNotification.save().then(notify => {
        });


    }
};