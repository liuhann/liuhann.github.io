/**
 * Created by Administrator on 2015/6/17.
 */

function createAnimatedSprite(plist, name, x, y, frameSize, animationTime, interval) {
    var sprite = new cc.Sprite();
    cc.spriteFrameCache.addSpriteFrames(plist);
    var frames = [];
    for(var i=0; i<frameSize; i ++) {
        var str = name + ((10000+i)+ "").substring(1);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        frames.push(frame);
    }
    sprite.attr({
        'x': x,
        'y': y
    });
    if (!interval) {
        var animation = new cc.Animation(frames, animationTime, cc.REPEAT_FOREVER);
        var action = new cc.Animate(animation);
        sprite.runAction(action);
    } else {
        var animation = new cc.Animation(frames, animationTime);
        var action = new cc.Animate(animation);
        sprite.runAction(cc.sequence(action, cc.delayTime(interval)).repeatForever());
    }
    return sprite;
}

function createByFrame(plist, name) {
    cc.spriteFrameCache.addSpriteFrames(plist);
    var frame = cc.spriteFrameCache.getSpriteFrame(name);
    var sprite = new cc.Sprite(frame);
    return sprite;
}

function runAnimation(sprite, name, frameSize, animationTime) {
    var frames = [];
    for(var i=0; i<frameSize; i ++) {
        var str = name + ((10000+i)+ "").substring(1);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        frames.push(frame);
    }
    var animation = new cc.Animation(frames, animationTime, cc.REPEAT_FOREVER);
    var action = new cc.Animate(animation);
    sprite.runAction(action);
    return sprite;
}

function createBakedSpite(res, x, y) {
    var sprite = new cc.Sprite(res);
    sprite.attr({
        "anchorX": 0,
        "anchorY": 0,
        "x": x,
        "y": y
    });
    var bakeLayer = cc.Layer.create();
    bakeLayer.addChild(sprite, 0);
    bakeLayer.bake();
    return bakeLayer;
}


function addBakedSpriteToLayer(res, x, y, layer, zorder) {
    var sprite = new cc.Sprite(res);
    sprite.attr({
        "anchorX": 0,
        "anchorY": 0,
        "x": x,
        "y": y
    });
    var bakeLayer = cc.Layer.create();
    bakeLayer.addChild(sprite, 0);
    bakeLayer.bake();
    layer.addChild(bakeLayer, zorder);
    return sprite;
}

function addMovingAroundSprite(res,delay,dura, sx, sy, tx, ty) {
    var sprite = new cc.Sprite(res);
    sprite.attr({
        x: sx,
        y: sy
    });
    return setMovingAround(sprite, delay, dura, sx, sy, tx, ty);
}

function setMovingLoops(sprite, delay, dura, deltaX, deltaY, noback) {
    var srcpos = {
        x : sprite.x,
        y : sprite.y
    };
    sprite.schedule(function() {
        sprite.attr(srcpos);
        var moveAction = cc.MoveBy.create(dura, deltaX,deltaY);// cc.MoveTo.create(dura, cc.p(tx,ty));
        this.runAction(moveAction);
    }, dura , cc.REPEAT_FOREVER, delay);
    return sprite;
}

function flyIn(pic, dura, ox,oy, tx, ty) {
    var sprite =  new cc.Sprite(pic);
    sprite.attr({
        x:ox, y : oy
    });
    sprite.runAction(
        cc.moveTo(dura, cc.p(tx, ty)).easing(cc.easeIn(3.0))
    );
    return sprite;
}

function setZooming(sprite, delay, dura, zoom) {
    sprite.schedule(function() {

        if (this.scale<zoom+0.1) {
            var scaleAction = cc.ScaleTo(dura, 1);
            this.runAction(scaleAction);
        } else {
            var scaleAction = cc.ScaleTo(dura, zoom);
            this.runAction(scaleAction);
        }
    }, dura , cc.REPEAT_FOREVER, delay);
    return sprite;
}

function initNumberTexture() {
    var texture1 = cc.textureCache.addImage(common_res.NUMBER1_PNG);
    for(var i=0; i<50; i++) {
        var frame = new cc.SpriteFrame(texture1, cc.rect(0, i*7, 33,35));
        var namei  = "number1" + ((10000+i)+ "").substring(1);
        cc.spriteFrameCache.addSpriteFrame(frame, namei);
    }

    var texture2 = cc.textureCache.addImage(common_res.NUMBER2_PNG);
    for(var i=0; i<48; i++) {
        var frame = new cc.SpriteFrame(texture2, cc.rect(0, i*7, 23,34));
        var namei  = "number2" + ((10000+i)+ "").substring(1);
        cc.spriteFrameCache.addSpriteFrame(frame, namei);
    }
}

function createNumberSprite(number, name, ani) {
    if (name==null) {
        name = "number1";
    }
    initNumberTexture();

    if (ani==null) {
        var frames = [];
        var sprite = new cc.Sprite();

        for (var i = 0; i < 5 * number + 1; i++) {
            var str = name + ((10000 + i) + "").substring(1);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.03);
        var action = new cc.Animate(animation);
        sprite.runAction(action);
        return sprite;
    } else {
        var str = name + ((10000 + 5 * number) + "").substring(1);
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        var sprite = new cc.Sprite(frame);
        return sprite;
    }
    //sprite.attr({x:cc.winSize.width/2,y:cc.winSize.height/2});
}


function setMovingAround(sprite, delay, dura, sx, sy, tx, ty,flip) {
    sprite.attr({x: sx,y:sy});

    sprite.schedule(function() {
        if (Math.abs(this.x-sx)<10 && Math.abs(this.y-sy)<10) {
            if (flip) {
                this.flippedX = false;
            }
            var moveAction = cc.MoveTo.create(dura, cc.p(tx,ty));
            this.runAction(moveAction);
        } else {
            if (flip) {
                this.flippedX = true;
            }
            var moveAction = cc.MoveTo.create(dura, cc.p(sx,sy));
            this.runAction(moveAction);
        }
    }, dura , cc.REPEAT_FOREVER, delay);
    return sprite;
}

function enableDragMove(layer, width, height) {
    if( 'touches' in cc.sys.capabilities ) {
        cc.log("touch enabled");
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch, event) {
                var pos = touch.getLocation();
                return true;
            },
            onTouchMoved:function(touch, event) {
                var pos = touch.getLocation();
                var delta = touch.getDelta();
                var target = event.getCurrentTarget();

                var tox = target.getPositionX()+delta.x;
                var toy = target.getPositionY()+delta.y;

                if (tox<50 && tox>cc.winSize.width - width-20) {
                    target.setPositionX(tox);
                }
                if (toy<0 && toy>cc.winSize.height- height) {
                    target.setPositionY(toy);
                }
            },
            onTouchEnded:function(touches, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                console.log("arget " + target + "  posx " + target.getPositionX());
                if (target.getPositionX()>0) {
                    target.runAction(cc.moveTo(0.5, 0).easing(cc.easeBounceIn()));
                }
            }
        }, layer);
    } else if( 'mouse' in cc.sys.capabilities ) {
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                var pos = event.getLocation();
                onMoveStart(pos);
                return true;
            },
            onMouseMove: function(event){
                var pos = event.getLocation();
                onMoving(pos);
            },
            onMouseUp: function(event) {
                var pos = event.getLocation(), target = event.getCurrentTarget();
                onMoveUp(target);
            }
        }, layer);
    } else {
        cc.log("TOUCH-ONE-BY-ONE test is not supported on desktop");
    }

    function onMoveUp(target) {
        var max = onMoveOver(target);

        if (!max && layer.getUserData()!=null) {
            var p = layer.getUserData();
            var dura = new Date().getTime() - p.t;
            var momentumX = momentum(layer.getPositionX(), p.startx, dura*2, cc.winSize.width - width,0);
            var momentumY = momentum(layer.getPositionY(), p.starty, dura*2, cc.winSize.height- height,0);

            layer.runAction(
                cc.moveTo(0.3, cc.p(momentumX.destination, momentumY.destination)).easing(cc.easeOut(3.0))
            );
        }
        layer.setUserData(null);
    }

    function onMoving(pos) {
        if (layer.getUserData()!=null) {
            var tox = layer.getPositionX() + pos.x - layer.getUserData().x;
            var toy = layer.getPositionY() + pos.y - layer.getUserData().y;

            if (tox<50 && tox>cc.winSize.width - width - 50 && width>cc.winSize.width) {
                layer.setPositionX(tox);
            }
            if (toy<50 && toy>cc.winSize.height- height -50 && height>cc.winSize.height) {
                layer.setPositionY(toy);
            }
            pos.t = layer.getUserData().t;
            pos.startx = layer.getUserData().startx;
            pos.starty = layer.getUserData().starty;
            layer.setUserData(pos);
        }
    }

    function onMoveStart(pos) {
        pos.t = new Date().getTime();
        pos.startx = layer.getPositionX();
        pos.starty = layer.getPositionY();
        layer.setUserData(pos);
    }

    function onMoveOver(target) {
        var max = false;
        if (target.getPositionX()>0) {
            target.runAction(
                cc.moveTo(0.3, cc.p(0, target.getPositionY())).easing(cc.easeOut(3.0))
            );
            max = true;
        }
        if (target.getPositionX()<cc.winSize.width - width) {
            target.runAction(
                cc.moveTo(0.3, cc.p(cc.winSize.width - width, target.getPositionY())).easing(cc.easeOut(3.0))
            );
            max = true;
        }
        if (target.getPositionY()>0) {
            target.runAction(
                cc.moveTo(0.3, cc.p(target.getPositionX(), 0)).easing(cc.easeOut(3.0))
            );
            max = true;
        }
        if (target.getPositionY()<cc.winSize.height- height) {
            target.runAction(
                cc.moveTo(0.3, cc.p(target.getPositionX(), cc.winSize.height- height)).easing(cc.easeOut(3.0))
            );
            max = true;
        }
        return max;
    }

    function momentum(current, start, dura, min, max, deceleration) {
        var distance = current - start,
            speed = Math.abs(distance)/dura;
        deceleration = deceleration === undefined ? 0.0006 : deceleration;
        var destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
        var duration = speed / deceleration;
        if (destination<min) destination = min;
        if (destination>max) destination = max;
        return {
            destination: Math.round(destination),
            duration: duration
        };
    }
}


function enableDragDrop(sprite, targetAreas, data, cb) {
    var srcPos = {x:sprite.x, y:sprite.y};
    if( 'touches' in cc.sys.capabilities ) {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.setUserData({md: true, mx: pos.x-target.x, my:pos.y-target.y});
                    return true;
                } else {
                    return false;
                }
            },
            onTouchMoved:function(touch, event) {
                if (sprite.getUserData() && sprite.getUserData().md) {
                    var pos = touch.getLocation();
                    sprite.attr({x: pos.x-sprite.getUserData().mx, y: pos.y - sprite.getUserData().my});
                }
            },
            onTouchEnded:function(touch, event) {
                if (sprite.getUserData() && sprite.getUserData().md) {
                    var pos = touch.getLocation();
                    sprite.setUserData({md: false});

                    for(var i=0; i<targetAreas.length; i++) {
                        if (cc.rectContainsPoint(targetAreas[i], pos)) {
                            cb(sprite, targetAreas[i], data);
                            return true;
                        }
                    }
                    sprite.runAction(cc.moveTo(0.3,srcPos.x, srcPos.y));
                }
            }
        }, sprite);
    } else if( 'mouse' in cc.sys.capabilities ) {
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                var pos = event.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.setUserData({md: true, mx: pos.x-target.x, my:pos.y-target.y});
                    return true;
                } else {
                    return false;
                }
            },
            onMouseMove: function(event){
                if (sprite.getUserData() && sprite.getUserData().md) {
                    var pos = event.getLocation();
                    sprite.attr({x: pos.x-sprite.getUserData().mx, y: pos.y - sprite.getUserData().my});
                }
            },
            onMouseUp: function(event) {
                if (sprite.getUserData() && sprite.getUserData().md) {
                    var pos = event.getLocation();
                    sprite.setUserData({md: false});

                    for(var i=0; i<targetAreas.length; i++) {
                        if (cc.rectContainsPoint(targetAreas[i], pos)) {
                            cb(sprite, targetAreas[i], data);
                            return true;
                        }
                    }
                    sprite.runAction(cc.moveTo(0.3,srcPos.x, srcPos.y));
                }
            }
        }, sprite);
    } else {
        cc.log("TOUCH-ONE-BY-ONE test is not supported on desktop");
    }
}

function swallowTouch(layer) {
    cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan:function(touch, event) {
            return true;
        }
    }, layer);
}

function createButton(img, rect, cb) {
    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.setScale9Enabled(true);
    button.loadTextures(img, img , "");
    button.x = rect.x;
    button.y = rect.y;
    button.setContentSize(cc.size(rect.width, rect.height));

    button.addTouchEventListener(function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                cb.bind(button)();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            default:
                break;
        }
    }, this);
    return button;
}

function format_time(_second) {
    var fmt = "mm:ss";
    var o = {
        "m+": Math.floor(_second/60),
        "s+": _second%60
    };
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
}

function bindtouch(sprite, cb) {
    cc.eventManager.addListener({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan:function(touch, event) {
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();

            if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                cb.bind(target)();
                return true;
            }
             return false;
        }
    }, sprite);
}

