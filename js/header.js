(function($) {

    var $header = $('.js-siteHeader');

    // COLLAPSED NAV
    var $menu = $('.js-collapsedMenu'),
        $toggleMenu = $('.js-toggleMenu'),
        closeMenu = function(){
            $toggleMenu.removeClass('opened');
            $menu.removeClass('opened').slideUp();
        },
        openMenu = function(){
            $toggleMenu.addClass('opened');
            $menu.addClass('opened').slideDown();
        },
        isMobile = function() {
            if($menu.length && $toggleMenu.css('display') !== 'none'){
                return true;
            } else {
                return false;
            }
        },
        mobileFixes = function(){
            if(isMobile()){
                // Is mobile
                $toggleMenu.removeClass('opened');
                $menu.removeClass('opened').hide();
            } else {
                $toggleMenu.removeClass('opened');
                $menu.removeClass('opened').show();
            }
        };

    // Collapsed event
    $toggleMenu.on('click', function(e) {
        e.preventDefault();

        if($menu.hasClass('opened')){
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Mobile fixes
    // mobileFixes();
    // $(window).resize(mobileFixes);

    // Reload page when viewport changes to mobile or desktop
    // var isMobileCurrently = isMobile(),
    //     viewportHasChanged = function() {
    //         if(isMobile() !== isMobileCurrently) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     };
    // $(window).on('resize',function(){
    //     if(viewportHasChanged()) {
    //         location.reload();
    //     }
    // });



})(jQuery);