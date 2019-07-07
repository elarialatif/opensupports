$(document).ready(function () {
    var lang = 'en';
    if (sessionStorage.getItem("lang")) {
        $('html').attr('dir', 'rtl');
        lang = 'ar';
    }
    var i18n = domI18n({
        selector: '[data-translatable]',
        separator: ' // ',
        languages: ['en', 'ar'],
        defaultLanguage: 'en',
        currentLanguage: lang
    });

    console.log("ready!");
    // Tabs

    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current menu__list-item_selected');
        $('.tab-content').removeClass('current');

        $(this).addClass('current menu__list-item_selected');
        $("#" + tab_id).addClass('current');
    });
    //

    $(".lang_change_ar").on("click", function () {
        $('html').attr('dir', 'rtl');
        sessionStorage.setItem("lang", "ar");
        i18n.changeLanguage('ar');
        location.reload();
    });
    $(".lang_change_en").on("click", function () {
        sessionStorage.removeItem("lang");
        i18n.changeLanguage('en');
        $('html').attr('dir', 'ltr');
        location.reload();
    });


    // Notification
    close = document.getElementById("close");
    close.addEventListener('click', function () {
        note = document.getElementById("note");
        note.style.display = 'none';
    }, false);
});