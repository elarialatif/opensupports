var mongoose = require('mongoose');
Schema = mongoose.Schema
var Ticket = mongoose.model('tickets', {

    userName: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    department: {
        type: String,
        require: true,
    },
    workedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    priority: {
        type: String,
        default: 'low',
    },
    status: {
        type: String,
        default: 'open',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = Ticket;