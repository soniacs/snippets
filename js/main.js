// RETURN TOP OFFSET
window.topOffset = window.topOffset || {};
topOffset = function() {
    var offset = 0;
    if ($('.js-siteHeader').length) {
        offset = $('.js-siteHeader').outerHeight();
    }
    return offset;
};


// SCROLL TO
window.scrollTo = window.scrollTo || {};
scrollTo = function(target, with_offset, animDuration) {
    var offset = 0;
    with_offset = typeof with_offset !== 'undefined' ? with_offset : true;
    animDuration = typeof animDuration !== 'undefined' ? animDuration : 500;
    if(with_offset) {
        offset = topOffset();
    }
    $('html, body').stop().animate({
        'scrollTop': target - offset
    }, animDuration);
};

// SET VIEWPORT HEIGHTS
window.setViewportHeight = window.setViewportHeight || {};
setViewportHeight = function(elem, property, with_offset) {
    with_offset = typeof with_offset !== 'undefined' ? with_offset : true;
    property = typeof property !== 'undefined' ? property : 'height';

    var height = $(window).height();

    if(with_offset) {
        height = height - topOffset();
    }
    elem.css(property, height);
};

// UPDATE HASH
window.updateHash = window.updateHash || {};
updateHash = function(target) {
    if (history.pushState) {
        window.history.pushState(null, null, target);
    } else {
        window.location.hash = target;
    }
};

// CLEAR HASH
window.clearHash = window.clearHash || {};
clearHash = function(){
    // Clear hashtag when modal is closed

    // var lastPos = $(window).scrollTop();
    // window.location.hash = '';
    //$(window).scrollTop(lastPos);

    if (history.pushState) {
        // IE10, Firefox, Chrome, etc.
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
    } else {
        // IE9, IE8, etc
        var lastPos = $(window).scrollTop();
        window.location.hash = '';
        $(window).scrollTop(lastPos);
    };
};

// DISABLE BODY SCROLL
window.disableScroll = window.disableScroll || {};
disableScroll = function(){
    var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
    $('html').addClass('noscroll').css('top',-scrollTop);
};

// ENABLE BODY SCROLL
window.enableScroll = window.enableScroll || {};
enableScroll = function(){
    var scrollTop = parseInt($('html').css('top'));
    $('html').removeClass('noscroll');
    $('html,body').scrollTop(-scrollTop);
};


// CHANGE HEADER ON SCROLL
window.addClassOnScroll = window.addClassOnScroll || {};
addClassOnScroll = function(elem, scrollOffset, className){
    var scroll = $(window).scrollTop();

    // Check if there's a scroll offset
    if(scrollOffset) {
        if(scroll >= parseInt(scrollOffset)) {
            elem.addClass(className);
        } else {
            elem.removeClass(className);
        }
    }
};


(function($) {

    // BROWSER RESIZE UPDATE
    setViewportHeight($('.js-screenHeight'), 'height');
    $(window).resize(function() {
        setViewportHeight($('.js-screenHeight'), 'height');
    });


    // SCROLL TO NEXT
    $('.js-scrollToNext').on('click', function(e) {
        e.preventDefault();
        var parent = $(this).parent(),
            nextElemPosition = parent.offset().top + parent.outerHeight();
        scrollTo(nextElemPosition);
    });


    // SCROLL TO
    $('.js-scrollTo').on('click', function(e) {
        e.preventDefault();
        scrollTo($(target).offset().top);
    });


    // HASH LINKS
    // Check for hash links
    // If there's hash scroll to element by compensating for header
    $(document).ready( function() {
        if(window.location.hash) {
            // Only set the timer if you have a hash
            setTimeout(function() {
                var target = window.location.hash;
                if($(target) && !$(target).hasClass('lightbox')){
                    scrollTo($(target).offset().top);
                }
            }, 500);
        }
    });


    // BODY LOADING
    $(window).bind("load", function() {
        $('body').addClass('loaded');
    });

})(jQuery);