


;(function($) {

    function DeviceShell(container, options) {

        var width = options.width;
        var type = options.type;

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


        if (!type)  type= 'iphone';

        $(container).css("border", " 2px solid " + barder_color);
        $(container).css("border-radius", "20px");
        $(container).css("background-color", shell_color);
        $(container).css("position", "relative");

        if (type==="iphone") {
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
        }

        if (type==='ipad') {
            $(container).css("width", width);
            $(container).css("height", width * 32/48);

            $(screen).css("width", width * 5/6);
            $(screen).css("height", width * 5/6 * 3/4);
            $(screen).css("position", "absolute");
            $(screen).css("left", "50%");
            $(screen).css("top", "50%");
            $(screen).css("border", " 1px solid " + barder_color);
            $(screen).css("background-color", "screen_color");
            $(screen).css("margin", "-31.25% -41.67%");
            $(screen).css("box-sizing", "border-box");
            $(screen).css("overflow", "hidden");

            $(home).css("width", width * 3/48);
            $(home).css("height", width * 3/48);
            $(home).css("border", " 1px solid " + barder_color);
            $(home).css("position", "absolute");
            $(home).css("right", width * 0.5/48);
            $(home).css("top", "50%");
            $(home).css("border-radius", "50%");
            $(home).css("margin", "-3.125% 0");

            $(speaker).css("width", width * 0.4/48);
            $(speaker).css("height", width * 3/48);
            $(speaker).css("border", " 1px solid " + barder_color);
            $(speaker).css("position", "absolute");
            $(speaker).css("border-radius", width * 0.02);
            $(speaker).css("left", width/48);
            $(speaker).css("top", "50%");
            $(speaker).css("margin", "-3.125% 0");
        }

        function getScreen() {
            return screen;
        }

        return {
            getScreen: getScreen
        }
    }

    $.fn.deviceshell = function(options) {

        var shell = new DeviceShell(this, options);
        return shell.getScreen();
    };


}(jQuery));