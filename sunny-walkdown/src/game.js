/**
 * Created by Administrator on 2015/7/3.
 */

var k1_1_loading = {
    ParallaxLayer : cc.Layer.extend({
        _parentNode: null,
        ctor: function () {
            this._super();

            this._background = new cc.Sprite(k_1_1_loading_res.EMPTYBG_PNG);
            this._background.anchorX = 0;
            this._background.anchorY = 0;
            this._sky = new cc.Sprite(k_1_1_loading_res.SKY_PNG);
            this._sky.anchorX = 0;
            this._sky.anchorY = 0;

            this._cloud1 = new cc.Sprite(k_1_1_loading_res.CLOUD1_PNG);
            this._cloud1.anchorX = 0;
            this._cloud1.anchorY = 0;
            this._cloud2 = new cc.Sprite(k_1_1_loading_res.CLOUD2_PNG);
            this._cloud2.anchorX = 0;
            this._cloud2.anchorY = 0;

            this._parentNode = new cc.ParallaxNode();

            this._emptyLayer = new cc.Sprite();

            this._parentNode.addChild(this._sky, -3, cc.p(1.0, 1.0), cc.p(0,120));
            this._parentNode.addChild(this._cloud1, -2, cc.p(0.3, 0.5), cc.p(0,250));
            this._parentNode.addChild(this._cloud2, -1, cc.p(0.4, 0.5), cc.p(0,200));
            this._parentNode.addChild(new cc.Sprite(k_1_1_loading_res.SCLOUD1_PNG), -2, cc.p(2, 0.5), cc.p(200,600));
            this._parentNode.addChild(this._background, 1, cc.p(1.0, 1.0), cc.p(0,0));
            this._parentNode.addChild(this._emptyLayer, -1, cc.p(1.0, 1.0), cc.p(0,0));

            var goRight = cc.moveBy(10, cc.p(-968, 0));
            var delay = cc.delayTime(2.0);
            //var goLeft = goRight.reverse();
            var seq = cc.sequence(goRight, delay/*, goLeft*/);
            this._parentNode.runAction(seq);
            this.addChild(this._parentNode);

            var walkingGirls = createAnimatedSprite(k_1_1_loading_res.GIRLWALK_PLIST, "ldgirlwalk1", 200, 200, 15, 0.03);
            this.addChild(walkingGirls, 10);

            for(var i=0; i<this._grows.length; i++) {
                var grow = this._grows[i];
                if (grow.back) {
                    this._emptyLayer.addChild(this.growUp(grow.res,grow.x,grow.y,grow.rotation, grow.time),-1);
                } else {
                    this._background.addChild(this.growUp(grow.res,grow.x,grow.y,grow.rotation, grow.time),1);
                }
            }
            /*
            this.scheduleOnce(function() {
                this._emptyLayer.addChild(this.growUp(k_1_1_loading_res.GRASS1_PNG,70,330,0),-1);
                this._background.addChild(this.growUp(k_1_1_loading_res.TREE1_PNG,70,330,0),10);
            }, 1);

            this.scheduleOnce(function() {
                this._emptyLayer.addChild(this.growUp(k_1_1_loading_res.GRASS2_PNG,230,400,0),10);
                this._background.addChild(this.growUp(k_1_1_loading_res.TREE2_PNG,240,410,0),10);
            }, 1.5);
            */
            this.sunRound();
        },

        _grows: [
            {
                time: 0,
                res: k_1_1_loading_res.GRASS1_PNG,
                x: 70,
                y: 330,
                back: true,
                rotation: 0
            },
            {
                time: 0.2,
                res: k_1_1_loading_res.TREE1_PNG,
                x: 70,
                y: 330,
                back: false,
                rotation: 0
            },
            {
                time: 0.5,
                res: k_1_1_loading_res.GRASS2_PNG,
                x: 245,
                y: 400,
                back: true,
                rotation: 0
            },
            {
                time: 0.6,
                res: k_1_1_loading_res.TREE2_PNG,
                x: 255,
                y: 410,
                back: false,
                rotation: 0
            },
            {
                time: 0.8,
                res: k_1_1_loading_res.HOUSE1_PNG,
                x: 420,
                y: 415,
                back: false,
                rotation: 0
            },
            {
                time: 1,
                res: k_1_1_loading_res.ZHALAN_PNG,
                x: 319,
                y: 390,
                back: false,
                rotation: 0
            },
            {
                time: 1,
                res: k_1_1_loading_res.ZHALAN_PNG,
                x: 515,
                y: 390,
                back: false,
                rotation: 0
            },
            {
                time: 1,
                res: k_1_1_loading_res.MAILBOX_PNG,
                x: 330,
                y: 419,
                back: false,
                rotation: 0
            },
            {
                time: 1,
                res: k_1_1_loading_res.TREE3_PNG,
                x: 516,
                y: 418,
                back: false,
                rotation: 0
            },
            {
                time: 1.3,
                res: k_1_1_loading_res.GRASS2_PNG,
                x: 609,
                y: 403,
                back: true,
                rotation: 20
            },
            {
                time: 1.6,
                res: k_1_1_loading_res.GRASS2_PNG,
                x: 760,
                y: 380,
                back: true,
                rotation: 20
            },
            {
                time: 1.5,
                res: k_1_1_loading_res.TREE1_PNG,
                x: 546,
                y: 146,
                back: false,
                rotation: 0
            },
            {
                time: 3,
                res: k_1_1_loading_res.GRASS1_PNG,
                x: 1006,
                y: 300,
                back: true,
                rotation: 15
            },
            {
                time: 3.5,
                res: k_1_1_loading_res.TREE2_PNG,
                x: 1206,
                y: 260,
                back: false,
                rotation: 0
            }, {
                time: 6,
                res: k_1_1_loading_res.HOUSE2_PNG,
                x: 1526,
                y: 340,
                back: false,
                rotation: 0
            },
        ],

        onEnter:function(){
            this._super();
        },

        growUp: function(res, x, y, rotate, delay) {
            var sprite = new cc.Sprite(res);
            sprite.attr({
                x: x,
                y: y,
                anchorY: 0,
                scaleY: 0,
                rotation: rotate
            });
            sprite.runAction(cc.sequence(cc.delayTime(delay),
                cc.scaleTo(0.5, 1,1).easing(cc.easeElasticOut(3.0))));
            return sprite;
        },

        sunRound: function() { //太阳效果。 以后抽为共用
            var sunSprite = new cc.Sprite(k_1_1_loading_res.S2_SUN_PNG);
            sunSprite.attr({
                x:121,y:700,scale:0.6
            });
            sunSprite.runAction(
                cc.spawn(
                    cc.sequence(cc.scaleTo(1,0.6), cc.scaleTo(1,0.7)),
                    cc.sequence(cc.rotateBy(2, 360)))
                    .repeatForever()
            );
            this.addChild(sunSprite, 5);

            var sunRaySprite = new cc.Sprite(k_1_1_loading_res.S2_SUNRAY_PNG);
            sunRaySprite.attr({
                x:121,y:700,scale:0.6
            });
            sunRaySprite.runAction(
                cc.sequence(cc.scaleTo(1,0.6), cc.scaleTo(1,0.7)).repeatForever()
            );
            this.addChild(sunRaySprite, 4);
        }
    }),

    gameScene: cc.Scene.extend({
        onEnter : function () {
            this._super();
            this.setName("GameSceneK1-1-3");
            this.addChild(new k1_1_loading.ParallaxLayer(), 1);
        }
    })
}