$(document).ready(function () {
    console.log("ready!");
    jQuery("html[dir=rtl]").find("head").append('<link rel="stylesheet" href="assets/css/rtl.css">', '<link rel="stylesheet" href="assets/css/responsive-rtl.css">');
    // Tabs
    $('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current menu__list-item_selected');
		$('.tab-content').removeClass('current');

		$(this).addClass('current menu__list-item_selected');
		$("#"+tab_id).addClass('current');
	})
    
});