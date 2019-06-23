$(document).ready(function () {
    console.log("ready!");
    // jQuery("html[dir=rtl]").find("head").append('<link rel="stylesheet" href="assets/css/rtl.css">', '<link rel="stylesheet" href="assets/css/responsive-rtl.css">');
    // 
    // $(document).on('click','.lang_change',function(){
    //     console.log("1!");
    //     $(document).find('html').attr('dir', 'rtl');
    //     console.log("2!");
    // });
    console.log("1!");
    $(".lang_change").on("click",function(){
        console.log("1!");
        find('html').attr('dir', 'rtl');
        console.log("2!");
      });
    // Tabs
    $(document).on('click','.drop-down__current-item',function(){
        $(document).find('.drop-down__list-container').addClass('active');
    });
    // 
    
});