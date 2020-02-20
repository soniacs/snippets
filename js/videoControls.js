(function($) {

    // Video controls
    var getVideo = function(trigger) {
            return trigger.siblings('video').get(0);
        },
        muteVideo = function(video, trigger) {
            if (video.muted) {
                trigger.removeClass('muted');
                video.muted = false;
            } else {
                trigger.addClass('muted');
                video.muted = true;
            }
        },
        playVideo = function(video, trigger) {
            video.play();
            trigger.addClass('playing');
        },
        pauseVideo = function(video, trigger) {
            video.pause();
            trigger.removeClass('playing');
        };


    $('.js-playVideo').on('click', function(e) {
        e.preventDefault();

        var video = getVideo($(this));
        if (video.paused) {
            playVideo(video, $(this));
        } else {
            pauseVideo(video, $(this));
        }
    });


    $('.js-muted').on('click', function(e) {
        e.preventDefault();
        muteVideo(getVideo($(this)), $(this));
    });



})(jQuery);