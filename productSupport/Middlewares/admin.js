module.exports = {
    AdminAuthicated: function (req, res, next) {
        if (req.isAuthenticated()) {
            var url = req.originalUrl;
            if (req.user.role === 'admin') next();
            else if ((req.originalUrl === '/admin/tickets/all' || req.originalUrl === '/admin/myAccount' || url.includes("admin/ticket/view/")) && req.user.role === 'stuff') next();
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