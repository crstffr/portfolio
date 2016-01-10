(function($){

    function Viewport(options) {

        this.$element = $(options.element);
        this.$control = $(options.control);

    }

    Viewport.prototype.clear = function() {
        if (this.page) {
            this.page.destroy();
        }
    };

    Viewport.prototype.loadPage = function(options) {

        this.clear();

        var page = new Page(options);

        page.$element.appendTo(this.$element);
        page.setVpHeight(this.height);
        this.page = page;
        page.load();

        return page;

    };

    Viewport.prototype.position = function(options) {

        this.top = options.top;
        this.left = options.left;
        this.width = options.width;
        this.height = options.height;

        var both = this.$element.add(this.$control);

        both.width(this.width)
            .height(this.height)
            .css('top', this.top)
            .css('left', this.left);

        if (this.page) {
            this.page.setVpHeight(this.height);
        }

    };

    window.Viewport = Viewport;

})(jQuery);