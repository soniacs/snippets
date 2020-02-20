(function($) {

    // GALLERY LIGHTBOX
    var appendVideo = function(videoUrl) {
            // Make lightbox container
            var lightboxContainer = lightbox.create();

            // Append video
            video = $('<div class="video"><iframe src="' + videoUrl + '" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>').appendTo(lightboxContainer);

            return video;
        },
        stopVideo = function(element) {
            var iframe = element.find('iframe');
            if(iframe !== null) {
                var iframeSrc = iframe.attr('src');
                iframe.attr('src', iframeSrc);
            }
        };

    // Create video lightbox and index
    $('.js-viewVideo').each(function(index) {
        var videoLightbox = appendVideo($(this).attr('data-video'));
        $(this).attr('data-video', index);
        videoLightbox.parents('.lightbox').attr('data-video', index);
    });

    // Open gallery lightbox event
    $('.js-viewVideo').on('click', function(){

        var lightboxElem = $('.lightbox[data-video="' + $(this).attr('data-video') + '"]');

        if(lightboxElem) {
            // Disable body scroll
            disableScroll();

            // Show lightbox
            lightbox.show(lightboxElem);
        }
    });

    // Stop video on close
    $('body').delegate('.js-closeLightbox','click',function() {
        stopVideo($(this).parent());
    });


})(jQuery);