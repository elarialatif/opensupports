var mongoose = require('mongoose');
Schema = mongoose.Schema
var Log = mongoose.model('logs', {

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    model: {
        type: String
    },
    modelObjectId: {
        type: String
    },

    user: {
        type: String
    },
    action: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = Log;