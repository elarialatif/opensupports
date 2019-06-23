$(document).ready(function () {
    console.log("ready!");
    // Tabs
    $('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current menu__list-item_selected');
		$('.tab-content').removeClass('current');

		$(this).addClass('current menu__list-item_selected');
		$("#"+tab_id).addClass('current');
	})
	// 
	$(".lang_change_ar").on("click",function(){
		$('html').attr('dir', 'rtl');
	});
	$(".lang_change_en").on("click",function(){
		$('html').attr('dir', 'ltr');
	});
});