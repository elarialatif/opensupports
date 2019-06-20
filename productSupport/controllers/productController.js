var Product = require('../models/Product');
var logController = require('./logController');
var logAction = require('../helper/LogActions');
module.exports = {
    addProduct: function (name, user) {
        newProduct = new Product();
        newProduct.name = name;
        newProduct.user = user.id;
        return newProduct.save().then(result => {
            let LogName = 'تم اضافة المنتج رقم ';
            let Model = 'Product';
            logController.addLog(LogName, user.name, Model, result.id,logAction.create);
            return result;
        })
    }
}
