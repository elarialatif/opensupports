module.exports = {
  userAuthicated: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated())
            if (req.user.role === 'user') next();
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