var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        res.redirect('back');
    }
    else {
        res.render('index', {title: 'Express'});
    }

});
router.get('/badr', function (req, res, next) {
    res.send("badr");
});

module.exports = router;
