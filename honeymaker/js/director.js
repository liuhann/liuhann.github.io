/**
 * Created by 刘涵 on 2015/11/16.
 */


function Director() {

    function setLoadingScene(scene) {

    }

    function addScene(scene) {

    }


    function preloadPictures(pictureUrls, ci, callback) {
        var i,j,loaded = 0;
        for (i = 0, j = pictureUrls.length; i < j; i++) {
            (function (img, src) {
                img.onload = function () {
                    if (++loaded == pictureUrls.length && callback) {
                        callback();
                    }
                    ci(loaded);
                };
                // Use the following callback methods to debug
                // in case of an unexpected behavior.
                img.onerror = function () {};
                img.onabort = function () {};
                img.src = src;
            } (new Image(), pictureUrls[i]));
        }
    }
    return {
        preload: preloadPictures
    }
}

function Scene(wrip) {

    function enter() {
        wrip.sceneEnter.call();
    }

    function exit() {
        wrip.sceneExit.call();
    }
}



