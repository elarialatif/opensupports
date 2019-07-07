var mongoose = require('mongoose');
Schema = mongoose.Schema
var Product = mongoose.model('products', {

        enName: {
            type: String,
            require: true,
        },
        arName: {
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
    })
;
module.exports = Product;