/**
 * Created by 刘涵 on 2015/11/9.
 */

$(function() {
    setTimeout(function() {
        honeycomber.layedIn(5, true, 6);
    }, 100);

    $("#ratios").change(function() {
        $(".screen").removeClass().addClass("screen").addClass($(this).val());
    });

    $("#lines").change(function() {
        honeycomber.layedIn( parseInt($("#lines").val()), $("#odd").prop("checked"), 6);
    });

    $("#odd").change(function() {
        honeycomber.layedIn(parseInt($("#lines").val()), $("#odd").prop("checked"), 6);
    });
});

var honeycomber = new HoneyComber(".screen", ".hexconfig");