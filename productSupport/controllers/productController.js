var Product = require('../models/Product');
module.exports = {
    addProduct: function (name, user) {
        newProduct = new Product();
        newProduct.name = name;
        return newProduct.save().then(result => {
            return result;
        })
    }
}
