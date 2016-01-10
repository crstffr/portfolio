(function($){

    function Scrollbar() {

        this.$element = $('<div/>').addClass('scrollbar');

    }

    Scrollbar.prototype.setPosition = function(top) {

        this.$element.css({top: top});

    };

    Scrollbar.prototype.setHeight = function(height) {

        this.$element.height(height);

    };

    window.Scrollbar = Scrollbar;

})(jQuery);