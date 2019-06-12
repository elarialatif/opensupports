const mongoose = require('mongoose');
const ConnectToDb = mongoose.connect('mongodb://localhost:27017/productSupport').then(res => {
    console.log('connection made')
}).catch(err => {
    console.log('not connected' + err)
});
module.exports = ConnectToDb;