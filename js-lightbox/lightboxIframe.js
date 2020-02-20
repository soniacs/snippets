(function($) {

    // GALLERY LIGHTBOX
    var openLightboxIframe = function(lightboxElem) {
            // Show lightbox
            lightbox.show(lightboxElem);
        },
        createLightboxIframe = function(){
            $('.js-lightboxIframe').each(function(index) {

                // Make lightbox container
                var lightboxContainer = lightbox.create(),
                    lightboxElem = lightboxContainer.parent('.lightbox');

                // Append panel content
                var lightboxId = $(this).attr('data-panel'),
                    lightboxContent = $('<div class="lightbox-content">' + $(this).html() + '</div>').appendTo(lightboxContainer);

                // Add id and panel class to panel
                lightboxElem.attr('id', lightboxId).addClass('lightbox-iframe');
            });
        },
        stopMedia = function(element) {
            var iframe = element.find('iframe');
            if(iframe !== null) {
                iframe.each(function() {
                    var iframeSrc = $(this).attr('src');
                    $(this).attr('src', iframeSrc);
                });
            }
        };


    // LIGHTBOX GALLERIES
    // Create gallery lightbox
    createLightboxIframe();

    // Open lightbox if hash exists
    // if(window.location.hash) {
    //     var target = window.location.hash;
    //     if($(target) && $(target).hasClass('.lightbox')) {
    //         openLightboxGallery($(target));
    //     }
    // }


    // Open gallery lightbox event
    $('.js-openLightboxPanel').on('click', function(e){
        e.preventDefault();

        // Open lightbox
        var lightbox = $($(this).attr('href'));
        openLightboxPanel(lightbox);
    });



    // Close lightbox event
    $('body').delegate('.js-closeLightbox','click',function(e) {
        e.preventDefault();

        // Stop media
        stopMedia($(this).parents('.lightbox'));

        // Hide lightbox
        lightbox.hide($('.lightbox'));

        // Remove hash if it exists
        // if(window.location.hash) {
        //     clearHash();
        // }
    });

})(jQuery);