---
title: The animate.table alpha preview
author: Hand
date: 2016-01-16
demourl: http://liuhann.github.io/animate.table/index.html
github: https://github.com/liuhann/animate.table
template: article.jade
---

animate.table is a jquery plugin(would be react component and npm package in future) which can initialize a html table by json data with animations. animate.table is also a dynamic table. you can also insert\remove\update table or rows with animation.

![preview](preview.png)


## What is animate.table

animate.table is a jquery plugin(would be react component and npm package in future) which can initialize a html table by json data with animations. animate.table is also a dynamic table. you can also insert\remove\update table or rows with animation.

Find more at http://liuhann.github.io/animate.table/index.html


## Start up

include your js at the head


    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/underscore-min.js"></script>
    <script type="text/javascript" src="js/animate.table.js"></script>


And then prepare your data and the div to draw it !

    <div id="mytable"></div>

and then initialize table with data    
    
    <script>
        $("#yourtable").animatedTable().data(rowsData);    
    </script>

