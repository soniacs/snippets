(function($) {

    // GALLERY LIGHTBOX
    var openLightboxPanel = function(lightboxElem) {
            // Show lightbox
            lightbox.show(lightboxElem);
        },
        createLightboxPanel = function(){
            $('.js-lightboxPanel').each(function(index) {

                // Make lightbox container
                var lightboxContainer = lightbox.create(),
                    lightboxElem = lightboxContainer.parent('.lightbox');

                // Append panel content
                var lightboxId = $(this).attr('data-panel'),
                    lightboxContent = $('<div class="lightbox-content">' + $(this).html() + '</div>').appendTo(lightboxContainer);

                // Add id to panel
                lightboxElem.attr('id', lightboxId);

                // Add class to panel
                if($(this).attr('data-lighboxIframe')) {
                    lightboxElem.addClass('lightbox-iframe');
                } else {
                    lightboxElem.addClass('lightbox-panel');

                    // init scrollbar
                    lightboxElem.each(function(){
                        const ps = new PerfectScrollbar(this);
                    });
                }
            });
        };


    // LIGHTBOX GALLERIES
    // Create gallery lightbox
    createLightboxPanel();

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

        // Hide lightbox
        lightbox.hide($('.lightbox'));

        // Remove hash if it exists
        // if(window.location.hash) {
        //     clearHash();
        // }
    });

})(jQuery);