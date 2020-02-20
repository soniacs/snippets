// CREATE LIGHTBOX
window.lightbox = window.lightbox || {};
lightbox = {
    create: function() {
        // Make lightbox and append container
        var siteTitle = $('.js-siteTitle').html(),
            lightboxElem = $('<div class="lightbox"><div class="lightbox-overlay"></div><header class="lightbox-header"><div class="site-title">' + siteTitle + '</div><span class="close-lightbox js-closeLightbox"></span></header></div>').appendTo('body').hide();
            lightboxContainer = $('<div class="lightbox-container"></div>').appendTo(lightboxElem);

        return lightboxContainer;
    },
    show: function(lightboxElem, afterEvent) {
        afterEvent = typeof afterEvent !== 'undefined' ? afterEvent : false;
        lightboxElem.addClass('active').fadeIn(500, afterEvent);

        // Disable body scroll
        disableScroll();
    },
    hide: function(lightboxElem, afterEvent) {
        afterEvent = typeof afterEvent !== 'undefined' ? afterEvent : false;
        lightboxElem.removeClass('active').fadeOut(500, afterEvent);

        // Restore body scroll
        enableScroll();
    }
};