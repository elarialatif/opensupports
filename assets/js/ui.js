$(document).ready(function () {
    console.log("ready!");
    jQuery("html[dir=rtl]").find("head").append('<link rel="stylesheet" href="assets/css/rtl.css">', '<link rel="stylesheet" href="assets/css/responsive-rtl.css">');
    
    // Tabs
    $(document).on('click','.drop-down__current-item',function(){
        $(document).find('.drop-down__list-container').addClass('active');
    });
    // 
    
});