(function($){

    function Page(options) {

        this.top = 0;
        this.bottom = 0;
        this.img_top = 0;
        this.percent = 0;
        this.scroll_top = 0;

        this.url = options.url;
        this.width = options.width;
        this.height = options.height;

        this.$element = $('<div/>').addClass('page');
        this.$image = $('<img>').appendTo(this.$element);

        this.scrollbar = new Scrollbar();
        this.scrollbar.$element.appendTo(this.$element);

        $(window).on('resize', this.position.bind(this));

    }

    Page.prototype.load = function() {

        this.$image.css({top: 0}).hide()
                   .attr('src', this.url)
                   .on('load', function() {

                this.$image.show();
                this.position();

            }.bind(this));

    };

    Page.prototype.destroy = function() {

        this.$element.remove();

    };

    Page.prototype.calcPercent = function(val) {

        return val / this.img_top * 100;

    };

    Page.prototype.position = function() {

        this.width = this.$image.width();
        this.height = this.$image.height();
        this.img_top = -this.height + this.vpHeight;

        console.log('position page', this);

        var curr_top = parseInt(this.$image.css('top'));

        if (curr_top < this.img_top) {
            this.jumpToPercent(100);
        }

        this.setScrollHeight();
        this.updateScrollbar();

    };

    Page.prototype.setScrollHeight = function() {

        var scroll_h = (this.vpHeight / this.height) * this.vpHeight;

        this.scroll_top = this.vpHeight - scroll_h;

        this.scrollbar.setHeight(scroll_h);

    };

    Page.prototype.updateScrollbar = function() {

        var pos = this.percent / 100 * this.scroll_top;

        this.scrollbar.setPosition(pos);

    };

    /**
     * Viewport height, set by parent viewport so that the
     * bottom position of the page can be calculated.
     *
     * @param vpHeight
     */
    Page.prototype.setVpHeight = function(vpHeight) {

        this.vpHeight = vpHeight;

    };

    Page.prototype.jumpToPos = function(pos) {

        pos = pos < 0 ? pos : 0;
        pos = pos > this.img_top ? pos : this.img_top;

        this.percent = this.calcPercent(pos);
        this.$image.css('top', pos);
        this.updateScrollbar();

    };

    Page.prototype.jumpToPercent = function(percent) {

        percent = percent > 0 ? percent : 0;
        percent = percent < 100 ? percent : 100;

        var pos = this.img_top * percent / 100;
        this.$image.css('top', pos);

        this.percent = percent;
        this.updateScrollbar();

    };

    Page.prototype.scrollTo = function(percent, duration) {

        duration = duration || 1000;

        percent = percent > 0 ? percent : 0;
        percent = percent < 100 ? percent : 100;

        var pos = this.img_top * percent / 100;

        this.$image.animate({top: pos}, {
            duration: duration,
            step: function(pos){

            this.percent = this.calcPercent(pos);
            this.updateScrollbar();

        }.bind(this)});

    };

    Page.prototype.scrollByPercent = function(percent) {

        percent += this.percent;
        this.jumpToPercent(percent);

    };

    Page.prototype.scrollByPx = function(px) {

        var pos = this.img_top * this.percent / 100;
        this.jumpToPos(pos + px);

    };

    window.Page = Page;

})(jQuery);