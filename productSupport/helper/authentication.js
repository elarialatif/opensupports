module.exports = {
    userAuthicated: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === "user") {
                next();
            }
            else {
                res.redirect('/');
            }

        }
        else {
            res.redirect('/');
        }
    }
}