(function($) {

    $(".js-slideshow").each(function() {
        var dots = false,
            arrows = true,
            autoplay = false,
            autoplaySpeed = 5000,
            speed = 500,
            fade = false;

        if($(this).attr('data-dots') === 'true') {
            dots = true
        }
        if($(this).attr('data-arrows') === 'false') {
            arrows = false;
        }
        if($(this).attr('data-autoplay') === 'true') {
            autoplay = true;
        }
        if($(this).attr('data-autoplaySpeed')) {
            autoplaySpeed = parseInt($(this).attr('data-autoplaySpeed'));
        }
        if($(this).attr('data-speed')) {
            speed = parseInt($(this).attr('data-speed'));
        }
        if($(this).attr('data-fade') === 'true') {
            fade = true;
        }

        // Init slider
        $(this).slick({
            dots: dots,
            arrows: arrows,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            autoplay: autoplay,
            autoplaySpeed: autoplaySpeed,
            speed: speed,
            fade: fade,
            pauseOnFocus: false,
            pauseOnHover: false,
        });
    });

})(jQuery);