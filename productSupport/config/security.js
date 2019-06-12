var reCAPTCHA = require('recaptcha2');

module.exports = {
    reCAPTCHA: new reCAPTCHA({
        siteKey: '6LenzKcUAAAAALAhgj_pho85HrlWnf4f1pMnpfl0', // retrieved during setup
        secretKey: '6LenzKcUAAAAAF2RBdYyGy6i4Wne0irTWd5iGczL', // retrieved during setup
        ssl: true // optional, defaults to true.
                   // Disable if you don't want to access
                   // the Google API via a secure connection
    })
};
