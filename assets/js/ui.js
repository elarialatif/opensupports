$(document).ready(function () {
    console.log("ready!");
    jQuery("html[dir=rtl]").find("head").append('<link rel="stylesheet" href="assets/css/rtl.css">', '<link rel="stylesheet" href="assets/css/responsive-rtl.css">');
    // Error mssg
    $('#btn-validate').click(function () {
        var $captcha = $('#recaptcha'),
            response = grecaptcha.getResponse();

        if (response.length === 0) {
            $('.msg-error').text("reCAPTCHA is mandatory");
            if (!$captcha.hasClass("error")) {
                $captcha.addClass("error");
            }
        } else {
            $('.msg-error').text('');
            $captcha.removeClass("error");
            alert('reCAPTCHA marked');
        }
    })
    //
    $(document).on('click','.drop-down__current-item',function(){
        $(document).find('.drop-down__list-container').addClass('active');
     });
});