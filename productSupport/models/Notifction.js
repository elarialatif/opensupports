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
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = Notification;