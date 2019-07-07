var reCAPTCHA = require('recaptcha2');

module.exports = {
    reCAPTCHA: new reCAPTCHA({
        siteKey: '6Ldk46sUAAAAAE6-KWMwiGjQvh5nxDMQu6CE9TPr', // retrieved during setup
        secretKey: '6Ldk46sUAAAAAF_1cNCualHTGucAtF0m6OcsbPaA', // retrieved during setup
        ssl: true // optional, defaults to true.
                   // Disable if you don't want to access
                   // the Google API via a secure connection
    })
};
