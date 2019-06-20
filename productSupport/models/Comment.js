var mongoose = require('mongoose');
Schema = mongoose.Schema
var Comment = mongoose.model('comments', {

    comment: {
        type: String,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'tickets'
    },

    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = Comment;