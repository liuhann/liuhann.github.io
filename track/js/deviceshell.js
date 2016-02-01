;(function($) {

    function DeviceShell(container, width, type) {

        var barder_color = "#ccc";
        var shell_color = "#fff";
        var screen_color = "#000";

        var originalContent = $(container).html();

        var screen = $('<div class="screen"></div>');
        var home = $('<div class="home"></div>');
        var speaker = $('<div class="speaker"></div>');
        var extra = $('<div class="extra"></div>');

        screen.html(originalContent);
        $(container).empty();

        $(container).append(screen);
        $(container).append(home);
        $(container).append(speaker);
        $(container).append(extra);

        if (!type)  type=1;

        switch (type) {
            case 1:
                $(container).css("border", " 2px solid " + barder_color);
                $(container).css("border-radius", "20px");
                $(container).css("background-color", shell_color);
                $(container).css("position", "relative");

                $(container).css("width", width);
                $(container).css("height", width * 2);

                $(screen).css("width", width * 0.9);
                $(screen).css("height", width * 1.6);
                $(screen).css("position", "absolute");
                $(screen).css("left", "50%");
                $(screen).css("top", "50%");
                $(screen).css("border", " 1px solid " + barder_color);
                $(screen).css("background-color", "screen_color");
                $(screen).css("margin", "-80% -45%");
                $(screen).css("box-sizing", "border-box");
                $(screen).css("overflow", "hidden");

                $(home).css("width", width * 0.15);
                $(home).css("height", width * 0.15);
                $(home).css("border", " 1px solid " + barder_color);
                $(home).css("position", "absolute");
                $(home).css("left", "50%");
                $(home).css("bottom", "1.5%");
                $(home).css("border-radius", "50%");
                $(home).css("margin", "0 -7.5%");

                $(speaker).css("width", width * 0.15);
                $(speaker).css("height", width * 0.02);
                $(speaker).css("border", " 1px solid " + barder_color);
                $(speaker).css("position", "absolute");
                $(speaker).css("border-radius", width * 0.02);
                $(speaker).css("left", "50%");
                $(speaker).css("top", "4%");
                $(speaker).css("margin", "0 -7.5%");
                break;
        }

        function getScreen() {
            return screen;
        }

        return {
            getScreen: getScreen
        }
    }

    $.fn.deviceshell = function(options) {

        var shell = new DeviceShell(this, options.width,  options.type);
        return shell.getScreen();
    };


}(jQuery));