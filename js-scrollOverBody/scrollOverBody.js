(function($) {

    // SCROLL ELEM OVER BODY
    var elem = $('.js-scrollOver'),
        overlaySetup = function(elem) {
            // wrap body elements
            $("body").addClass('with-scroll-over').wrapInner( "<div class='body-wrapper'></div>");
            // remove headers and elem from wrapper
            if($('.js-pageHeader.small').length) {
                $('.js-pageHeader.small').prependTo('body');
            }
            $('.js-siteHeader').prependTo('body');
            elem.appendTo('body');
        },
        scrollOver = function(elem) {

            var bodyWrapper = $('.body-wrapper');
                elemHeight = elem.outerHeight(),
                documentHeight = $(document).height(),
                windowHeight = window.innerHeight,
                scroll = $(window).scrollTop();

            // Check if elem is in view
            // And add classes to make it scroll over body
            if(scroll + windowHeight >= documentHeight - elemHeight) {
                if(!bodyWrapper.hasClass('fixed')) {
                    bodyWrapper.addClass('fixed');
                    elem.addClass('visible');
                    $('body').css('height', documentHeight);
                }
            } else if(bodyWrapper.hasClass('fixed')) {
                bodyWrapper.removeClass('fixed');
                elem.removeClass('visible');
                $('body').css('height', '');
            }
        };


    $(window).bind("load", function() {
        overlaySetup(elem);
        scrollOver(elem);
        $(window).scroll(function(){
            scrollOver(elem);
        });
    });


})(jQuery);