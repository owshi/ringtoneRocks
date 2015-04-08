;
(function() {
    $.fn.sliderGallery = function() {
        var el = this,
            intervalS = 7000,
            slide = el.find('.slide'),
            page = el.find('.site-slider-pagination li'),
            max = slide.length - 1,
            activePage = 0;


        function activeSlide(i) {
            console.log(activePage, max)
            if (i > max) {
                i = activePage = 0;
            } else if (i < 0) {
                i = activePage = max;
            }
            page.removeClass('active');
            slide.removeClass('active');
            page.eq(i).addClass('active');
            slide.eq(i).addClass('active');
        }


        page.on('click', function() {
            var i = $(this).index();
            activeSlide(i);
        })

        el.startInterval = function(s) {
            this.interval = setInterval(function() {
                activePage++;
                activeSlide(activePage);
            }, s)
        }
        el.stopInterval = function() {
            clearInterval(this.interval);
        }
        el.mouseenter(function() {
            el.stopInterval();
        });

        el.mouseleave(function() {
            if (intervalS) {
                el.startInterval(intervalS);
            }
        });
        activeSlide(activePage);
        el.startInterval(intervalS);
    }
    if($('.site-slider').length) {
    $('.site-slider').sliderGallery();}
})(jQuery);
