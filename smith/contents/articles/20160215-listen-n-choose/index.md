---
title: A study game - Listen and choose
author: Hand
date: 2016-02-15
demourl: /listennchoose/index.html
template: article.jade
---

The game for kids  is made with cocos2d-js(html5) in this time last year. 

![preview](preview.png)

## A kick start of cocos-js (pure html5)
 
### 1. Prepare the html
 
    <body style="padding:0; margin: 0; background: #000;">
        <canvas id="gameCanvas"></canvas>
        <script type="text/javascript" src="cocos2d-js-v3.10.js" charset="UTF-8"></script>
        <script src="main.js"></script>
    </body>
 
### 2. A file with name project.json like this  

    {
      "project_type": "javascript",
      "debugMode": 0,
      "showFPS": true,
      "frameRate": 60,
      "id": "gameCanvas",
      "renderMode": 0,
      "modules": [
        "cocos2d",
        "extensions",
        "external"
      ],
      "jsList": [
        "src/GameScene.js",
        "src/app.js",
        "src/resource.js"
      ]
    }
 
 In this file, the jsList is the game js files to include. And the other configuration is the same as cocos2d-x


### 3. Write your js and include resources, Enjoy~!

    window.onload = function(){
        cc.game.onStart = function(){
            cc.view.adjustViewPort(true);
            cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.SHOW_ALL);
            cc.view.resizeWithBrowserSize(true);
            //load resources
            cc.LoaderScene.preload(g_resources, function () {
                cc.director.runScene(new PopoScene());
            }, this);
        };
        cc.game.run();
    }


## Conclusion

The main difference between cocos2d-html and cocos2d-native is the cocos2d single javascript source file。 


 
 



