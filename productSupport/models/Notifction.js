var mongoose = require('mongoose');
Schema = mongoose.Schema
var Notification = mongoose.model('notifications', {

    name: {
        type: String,
        require: true,
    },


    sendBy: {
        type: String,
    },
    sendTo: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = Notification;