(function($){

    function Background(options) {

        this.options = options;

        this.url = options.url;
        this.width = options.width;
        this.height = options.height;

        this.$element = $(options.element);
        this.$image = $('<img/>').appendTo(this.$element);

        this.viewport = new Viewport(options.viewport);

        this.ratios = {
            image_w: this.width / this.height,
            viewport_t: options.viewport.top / this.height,
            viewport_l: options.viewport.left / this.width,
            viewport_w: options.viewport.width / this.width,
            viewport_h: options.viewport.height / this.height
        };

        this.position();

    }

    Background.prototype.load = function() {

        var defer = $.Deferred();

        this.$image.attr('src', this.url).on('load', defer.resolve);

        return defer;

    };

    Background.prototype.position = function() {

        var curr_w = $(document).width();
        var curr_h = $(document).height();

        this.viewport.position({
            top: curr_h * this.ratios.viewport_t,
            left: curr_w * this.ratios.viewport_l,
            width: curr_w * this.ratios.viewport_w,
            height: curr_h * this.ratios.viewport_h
        });

    };

    window.Background = Background;

})(jQuery);