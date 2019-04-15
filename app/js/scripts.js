$(document).ready(function () {
    // SLIDER =====================================
    $('.carousel').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        speed: 1000,
        cssEase: 'linear'
    });

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


        // ADVANTAGES ===============================

        var advantagesPos = $('.advantages__title').position().top;
        var advantagesStart = $(this).scrollTop() + $(window).height();
        var window_width = $(window).width();

        if (advantagesStart >= advantagesPos && window_width > 768) {
            setTimeout(function () {
                $('.o1').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 500);
            setTimeout(function () {
                $('.o2').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 1000);
            setTimeout(function () {
                $('.o3').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 1500);
            setTimeout(function () {
                $('.o4').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 2000);
            setTimeout(function () {
                $('.o5').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 2500);
            setTimeout(function () {
                $('.o6').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 3000);
            setTimeout(function () {
                $('.o7').css('visibility', 'visible').addClass('animated fadeInRight')
            }, 3500);
            setTimeout(function () {
                $('.advantages .order-form-wrapper').css('visibility', 'visible').addClass('animated zoomIn')
            }, 4000);

        }
        if (advantagesStart >= advantagesPos && window_width < 768) {
            $('.o1, .o2, .o3, .o4, .o5, .o6, .o7, .advantages .order-form-wrapper').css('visibility', 'visible')
        }
    });

    // QUESTION SPIN ===============================
    var ok = 0;
    $('.spin__answer-yes').on('click', function () {
        if (!this.classList.contains('active_yes')) {
            $(this).addClass('active_yes');
            $(this).siblings('.spin__answer-no').removeClass('active_no');
            if (ok <= 3 && ok >= 0) {
                ok++;
                if (ok === 3) {
                    $(".spin__text-background").css('display', 'none');
                    $(".spin__benefits").css('display', 'flex');
                    // $(".spin").css('height', '730px');
                    $('.usefulness, .safety, .reliability').css('display', 'block').addClass('animated zoomIn');
                }
            }
        }
    });
    $('.spin__answer-no').on('click', function () {
        if (!this.classList.contains('active_no')) {
            if ($(this).siblings('.spin__answer-yes').hasClass('active_yes')) {
                ok--;
            }
            $(this).addClass('active_no');
            $(this).siblings('.spin__answer-yes').removeClass('active_yes');
        }
    });

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
    var checkBox = $(".approve");
    checkBox.on('click', function () {
        checkBox.change(function () {
            if (this.checked) {
                $('.spin__form-submit').removeAttr("disabled");
            }
            else {
                $('.spin__form-submit').attr('disabled', 'disabled');
                event.preventDefault();
            }
        });
    });
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

    // MIXITUP PORTFOLIO ===============================
    mixitup('.portfolio__category');
    $('.cakes').click();

    // PORTFOLIO TOGGLE ===============================
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

});

