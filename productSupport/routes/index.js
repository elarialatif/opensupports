var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var auth = require('../Middlewares/authentication');
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        res.redirect('back');
    }
    else {
        res.render('index', {title: 'Express'});
    }

});
router.post('/addComment', auth.userAuthicated(), function (req, res, next) {
    let comment = new Comment();
    comment.comment = req.body.comment;
    comment.user = req.user.id;
    comment.ticket = req.body.ticket_id;
    comment.save().then(comment => {
        res.send({comment: comment});
    }).catch(err => {
        res.send({err: 'an error happened please try again '});
    })
});
router.get('/deleteComment/:id', auth.userAuthicated(), function (req, res, next) {
    Comment.findByIdAndDelete({_id: req.params.id}).then(comment => {
        res.redirect('back');
    })
});
module.exports = router;
