// PRELOADER =====================================
$(window).on('load', function () {
    $(".loader-inner").fadeOut();
    $(".loader-wrapper").delay(400).fadeOut("slow");
});

$(document).ready(function () {

    // SCROLL TO TOP ===============================
    $('.go_to_top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    $(window).scroll(function () {
        var scroll_top = $(this).scrollTop();
        var window_height = $(window).height();
        var document_height = $(document).height();
        if (scroll_top + window_height >= document_height) {
            $('.scroll_down').css('display', 'none');
        }
        else {
            $('.scroll_down').css('display', 'block');
        }
        if ($(this).scrollTop() > $(window).height()) {
            $('.go_to_top').addClass("active");
        } else {
            $('.go_to_top').removeClass("active");
        }

        if (($(this).scrollTop() + $(window).height()) === document_height) {
            $('#popup__toggle').css("bottom", "160px")
        }
        else {
            $('#popup__toggle').css("bottom", "25px")
        }

    });

    // MENU BUTTON ===============================

    var headerNav = $('.header__menu');
    var slideMnuButton = $('.menu-slide-button');
    slideMnuButton.on('click', function () {
        headerNav.slideToggle();
    });
    $(window).resize(function () {
        var width = $(window).width();
        if (width > 768 && headerNav.is(':hidden')) {
            headerNav.removeAttr("style");
        }
    });

    slideMnuButton.click(function () {
        $(this).toggleClass("on");
        $(".main-mnu").slideToggle();
        return false;
    });

    // MASK for PHONE field ===============================
    $(".spin__form-phone").mask("+38(999) 999-99-99");

    // APPROVE CHECK ===============================
    var checkBox2 = $(".approve2");
    checkBox2.on('click', function () {
        checkBox2.change(function () {
            if (this.checked) {
                $('.spin__form-submit2').removeAttr("disabled");
            }
            else {
                $('.spin__form-submit2').attr('disabled', 'disabled');
                event.preventDefault();
            }
        });
    });

    // LAZY LOAD ===============================
    $(function() {
        $('.lazy').Lazy();
    });


    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    $('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    $('.all').click();
});

