/**
 * Created by 刘涵 on 2016/3/9.
 */


$(function() {
    Card.init(usersh);

    setTimeout(function(){
        Card.online("a2");
    }, 2000);

    setTimeout(function(){
        Card.online("a3");
    }, 4000);
    setTimeout(function(){
        Card.online("a6");
    }, 4500);
    setTimeout(function(){
        Card.online("a9");
    }, 5000);
    setTimeout(function(){
        Card.online("a5");
    }, 5500);

    setTimeout(function(){
        Card.group(genGroup(2));
    }, 7000);

    setTimeout(function(){
        Card.online("a4");
    }, 8000);

    setTimeout(function(){
        Card.ungroup();
    }, 10000);
    setTimeout(function(){
        Card.group(genGroup(4));
    }, 12000);

    setTimeout(function(){
        Card.ungroup();
    }, 14000);

});