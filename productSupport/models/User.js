var mongoose = require('mongoose');
var schema = mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now()
    }
});
const User = mongoose.model('users', schema);
module.exports = User;