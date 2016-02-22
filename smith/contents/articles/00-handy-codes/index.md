---
title: My handy codes
author: Hand
date: 2015-12-15
template: article.jade
---

Quick code reference

Front code collections for quickly input

![preview](preview.png)

### Callback when animation ends
    var ANI_EVENT_NAME = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(ele).on(ANI_EVENT_NAME,
        function(){
            $(this).off(ANI_EVENT_NAME);
        }
	);

