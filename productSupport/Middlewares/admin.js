module.exports = {
    AdminAuthicated: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === 'admin') next();
            else res.redirect('back')

        }
        else {
            res.redirect('/')
        }

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