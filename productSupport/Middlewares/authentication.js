module.exports = {
    userAuthicated: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else{res.redirect('/')}

        //     if (req.user.role === "user") {
        //         next();
        //     }
        //     else {
        //         res.redirect('/');
        //     }
        //
        // }
        // else {
        //     res.redirect('/');
        // }
    }
}