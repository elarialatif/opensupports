var mongoose = require('mongoose');
Schema = mongoose.Schema
var Product = mongoose.model('products', {

    name: {
        type: String,
        require: true,
    },


    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = Product;