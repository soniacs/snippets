(function($) {

    // GALLERY LIGHTBOX
    var createLightboxSlider = function(gallery) {
            // Make lightbox container
            var lightboxContainer = lightbox.create();

            // Append slider
            var lightboxSlider = $('<div class="lightbox-slider"></div>').appendTo(lightboxContainer);

            gallery.find('.js-galleryItem').each(function() {

                var caption = "",
                    captionText = $(this).attr('data-caption'),
                    videoUrl = $(this).attr('data-video'),
                    imageUrl = $(this).attr('data-image'),
                    mediaWrapper;

                if(captionText) {
                    caption = '<div class="caption">'+captionText+'</div>';
                }

                // Create media wrapper
                if(videoUrl) {
                    mediaWrapper = '<div class="video" data-video="' + videoUrl + '"><iframe src="' + videoUrl + '" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
                } else if(imageUrl) {
                    mediaWrapper = '<picture><img src="' + imageUrl + '" alt=""></picture>';
                }

                // Append media and caption to slider
                if(videoUrl || imageUrl) {
                    $('<div>'+ mediaWrapper + caption +'</div>').appendTo(lightboxSlider);
                }

            });

            // Init slider
            lightboxSlider.slick({
                arrows: true,
                dots: false,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
            });

            return lightboxSlider;
        },
        openLightboxGallery = function(lightboxElem) {
            //var lightboxElem = $('.lightbox[data-gallery="' + gallery.attr('data-gallery') + '"]');
            var lightboxSlider = lightboxElem.find('.lightbox-slider');

            // Show lightbox
            lightbox.show(lightboxElem);
            setTimeout(function() {
                lightboxSlider.slick("setPosition");
            }, 500);

            // TODO: video bug fix
            lightboxSlider.find('.video').each(function() {
                var videoIframe = $(this).find('iframe'),
                    correctSrc = $(this).attr('data-video');
                if(videoIframe.attr('src') !== correctSrc) {
                    videoIframe.attr('src', correctSrc);
                }
            });

            return lightboxSlider;
        },
        createLightboxGalleries = function(){
            $('.js-lightboxGallery').each(function(index) {

                // Create gallery lightbox and index
                var lightboxGallerySlider = createLightboxSlider($(this)),
                    lightboxGalleryContainer = lightboxGallerySlider.parents('.lightbox');
                $(this).attr('data-gallery', index);
                lightboxGalleryContainer.attr('data-gallery', index);

                // Add ID if href exists
                var thisHref = $(this).attr('data-href');
                if(thisHref) {
                    lightboxGalleryContainer.attr('id', thisHref);
                }
            });
        },
        stopVideo = function(element) {
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
    createLightboxGalleries();

    // Open lightbox if hash exists
    if(window.location.hash) {
        var target = window.location.hash;
        if($(target) && $(target).hasClass('.lightbox')) {
            openLightboxGallery($(target));
        }
    }


    // Open gallery lightbox event
    $('.js-galleryItem').on('click', function(e){
        e.preventDefault();

        var gallery = $(this).parents('.js-lightboxGallery');

        // Open gallery
        //lightboxSlider = openGallery(gallery);
        lightboxSlider = openLightboxGallery($('.lightbox[data-gallery="' + gallery.attr('data-gallery') + '"]'));

        // Go to current slider
        var thisIndex = $(this).data("index");
        if($(this).parents('.js-slideshow').hasClass('not-infinite')) {
            thisIndex = thisIndex - 1;
        }

        // if($(this).data("index") !== undefined){
        //     var thisIndex = $(this).data("index");
        // }else{
        //     // Somehow not working
        //     var thisIndex = $(this).index();
        // }

        console.log(thisIndex);

        lightboxSlider.slick('slickGoTo', thisIndex, true);
    });



    // Close lightbox event
    $('body').delegate('.js-closeLightbox','click',function(e) {
        e.preventDefault();

        // Move main slider
        var lightboxSlider = $(this).parents('.lightbox'),
            lightboxSliderIndex = lightboxSlider.find('.slick-current').attr('data-slick-index'),
            lightboxMainSlider = $('.js-lightboxGallery[data-gallery="' + lightboxSlider.attr('data-gallery') + '"]');

        if(!lightboxMainSlider.hasClass('not-infinite')) {
            lightboxSliderIndex = lightboxSliderIndex - 1;
        }
        lightboxMainSlider.slick('slickGoTo', lightboxSliderIndex, true);


        // Stop video
        stopVideo(lightboxSlider);

        // Hide lightbox
        lightbox.hide($('.lightbox'));

        // Remove hash if it exists
        if(window.location.hash) {
            clearHash();
        }
    });

})(jQuery);