var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userschema = mongoose.Schema({
    name: {
        type: String,
        required: {
            values: true,
            message: 'الاسم الاول مطلوب'
        },
    },

    email: {
        type: String,
        required: {
            values: true,
            message: 'الاميل مطلوب'
        },
        unique: {
            values: true,
            message: 'الاميل موجود بالفعل'
        },

    },
    img: {
        type: String
    },
    password: {
        type: String,
        required: {
            values: true,
            message: 'كلمة المرور مطلوب'
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    departments: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});
const User = mongoose.model('users', userschema);
module.exports = User;