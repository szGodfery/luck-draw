
;(function ($) {
    "use strict";

    $.fn.txtscroll = function (options) {
        //默认参数
        //{
        //   speed - 滚动间隔时间
        //}
        
        var settings = $.extend({
            'speed': 50
        }, options);

        return this.each(function () {
            var $this = $(this);
            var $settings = settings;

            var scrollbox = $('.scrollbox',$this);
            var txt_begin = $('.txt',$this);
            var txt_end = $('<div class="txt-clone"></div>');
            var scrollVaue = 0;

            function marquee() {
                if (txt_end.width() - scrollbox.scrollLeft() <= 0){
                    scrollVaue = scrollbox.scrollLeft() - txt_begin.width();
                    scrollbox.scrollLeft(scrollVaue);
                } else{
                    scrollVaue = scrollVaue + 1;
                    scrollbox.scrollLeft(scrollVaue);
                }
            }

            if(txt_begin.width() > scrollbox.width()){
                txt_end.html(txt_begin.html());
                scrollbox.append(txt_end);

                var setmarquee = setInterval(marquee, $settings.speed);
                $this.on('mouseover', function(){
                    clearInterval(setmarquee);
                });
                $this.on('mouseout', function(){
                    setmarquee = setInterval(marquee, $settings.speed);
                });
            }
        });
    };
})(jQuery);