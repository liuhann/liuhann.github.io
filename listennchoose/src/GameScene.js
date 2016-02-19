
var BgLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		
		var size = cc.winSize;
		//绘制最底层的大海  baked
		addBakedSpriteToLayer(res.PopobgSea_png, size.width/2, size.height-200, this, 0);

		//绘制海底珊瑚沙滩等  baked
		addBakedSpriteToLayer(res.Popobg_png, size.width/2, size.height/2, this, 2);
		
		//绘制横穿海底的小鱼  
		this.crossFishSprite1 = createAnimatedSprite(res.xiaoyu_plist, "xiaoyu", 15, 0.03);
		
		this.addChild(this.crossFishSprite1, 1);
		
		this.crossFishSprite1.schedule(function() {
			var size = cc.winSize;
			this.attr({
				x: size.width + 200,
				y: size.height - 120
			});
			var moveAction = cc.MoveTo.create(2, cc.p(-100, size.height - 120));
			this.runAction(moveAction);
		}, 5 , cc.REPEAT_FOREVER, 0);
		
		//水泡泡
		this.popo1 = createAnimatedSprite(res.popo_plist, "popo", 20, 0.02);
		this.popo1.attr({
			x: size.width-100,
			y: 400
		});
		this.addChild(this.popo1, 3);
	
		//cc.audioEngine.playEffect(res.poke_the_bubble_mp3, false);
		cc.audioEngine.playMusic(res.background_mp3, true);
		
		ccs.armatureDataManager.addArmatureFileInfo(res.haima_animation);
		var armature = new ccs.Armature("haima");
		
		armature.getAnimation().play("Animation1");

		armature.x = size.width / 2;
		armature.y = size.height / 2+50;
		
		this.addChild(armature,10);
		
		//this.scheduleUpdate();
	}
});

function addBakedSpriteToLayer(res, x, y, layer, zorder) {
	var sprite = new cc.Sprite(res);
	sprite.attr({
		"x": x,
		"y": y
	});
	var bakeLayer = cc.Layer.create();    
	bakeLayer.addChild(sprite, 0);
	bakeLayer.bake();
	layer.addChild(bakeLayer, zorder);
	return sprite;
}

function createAnimatedSprite(frames, name, frameSize, animationTime) {
	var sprite = new cc.Sprite();
	
	cc.spriteFrameCache.addSpriteFrames(frames);
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

var ForLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		var size = cc.winSize;
		
		addBakedSpriteToLayer(res.Forbg_png, size.width/2, size.height/2, this, 0);
		this.nextSprite = addBakedSpriteToLayer(res.Next_png, size.width - 80, size.height - 38, this, 1);
		attachEvent(this.nextSprite, function(sprite) {
			var scene = sprite.parent.parent.parent;
			scene.removeChildByTag(100);

			var playLayer = scene.getChildByTag(5);

			cc.eventManager.resumeTarget(playLayer, true);
			playLayer.fallSprites();
		});
		
		this.helpSprite = addBakedSpriteToLayer(res.Help_png, size.width - 240, size.height - 42, this, 1);
		
		//poke the bubble 标题
		addBakedSpriteToLayer(res.pokeTitle_png, 240, size.height-70, this, 1);
		
		//贝壳图片
		addBakedSpriteToLayer(res.shell_png, 58, size.height-65, this, 2);
	
		
		this.hornSprite = addBakedSpriteToLayer(res.Laba_on_png, size.width - 162, size.height - 38, this, 1);

		attachEvent(this.hornSprite, function() {
			this.audioEngine.pauseMusic();
		});
	}
});

var CelebrationLayer = cc.LayerColor.extend({
	ctor: function() {
		var size = cc.winSize;
		
		this._super(new cc.Color(255,255,255,125), size.width, size.height);
		
		
		var girlSprite = createAnimatedSprite(res.celebration_girl_plist, "163", 23, 0.03);
		girlSprite.attr({
			x: size.width/2,
			y: 200
		});
		this.addChild(girlSprite, 110);
		
		
		this.scoreLabel = new cc.LabelTTF("恭喜过关", "Arial", 48);

		this.scoreLabel.setColor(cc.color(0, 0, 0));
		this.scoreLabel.attr({
			x:size.width / 2,
			y:size.height
		});
		this.addChild(this.scoreLabel, 5);
		
		var dropAction = cc.MoveTo.create(3, cc.p(size.width/2, size.height/2+150));
		dropAction.easing(cc.easeBounceIn(3.0));
		
		this.scoreLabel.runAction(dropAction);

		ccs.armatureDataManager.addArmatureFileInfo(res.zhipian_animation);
		var armature = new ccs.Armature("zhipian");
		armature.setScale(2.5);
		armature.getAnimation().play("Animation2");
		
		armature.x = size.width / 2;
		armature.y = size.height / 2+50;

		this.addChild(armature,10);
		
	}
});

//游戏层  涉及用户交互
var PlayLayer = cc.Layer.extend({
	
	ctor: function() {
		this._super();
		cc.spriteFrameCache.addSpriteFrames(res.bomb_plist);
		currentData.round = 0;
		this.loadRound(currentData.round);
		this.showRepeatHorn();
	},
	
	showRepeatHorn: function() {
		this.repeatSprite = new cc.Sprite(res.Laba_on_png);
		var size = cc.winSize
		this.repeatSprite.attr({
			x: size.width - 50,
			y: size.height - 50
		});
		attachEvent(this.repeatSprite, function() {
			cc.audioEngine.playEffect(rounds[currentData.round][currentData.word].mp3, false);
		});
		this.addChild(this.repeatSprite, 10);
	},
	
	leftWords:[],
	bubbles:[],

	fallSprites: function() {
		var size = cc.winSize;
		var left = 230;
		var distance = (size.width - 240)/4;
	
		this.bubbles = this.bubbles.sort(function(){
			return cc.random0To1() > 0.5;
		});
		
		for(var i=0; i< this.bubbles.length; i++) {
			var sprite = this.bubbles[i];
			
			sprite.setScale(1);
			sprite.stopAllActions();
			sprite.unscheduleAllCallbacks();
			
			sprite.x = left + distance * i;
			sprite.y = size.height;

			sprite.setVisible(true);

			//var dropAction = cc.JumpTo(1, cc.p(sprite.x, 180 + 20 * cc.random0To1()));
			var dropAction = cc.MoveTo.create(1, cc.p(sprite.x, 250 + 30 * cc.random0To1()));
			sprite.runAction(dropAction);

			sprite.schedule(function() {
				var moveAction = cc.MoveTo.create(1, cc.p(this.x, 250 + 30 * cc.randomMinus1To1()));
				this.runAction(moveAction);
				cc.eventManager.resumeTarget(this,true);
			}, 1 , cc.REPEAT_FOREVER, 0);
		}
	},
	
	loadRound: function(r) {
		var roundInfo = rounds[r];
		this.bubbles = [];
		for ( var word in roundInfo) {
			var wordInfo = roundInfo[word];
			var sprite = new cc.Sprite(wordInfo.bubble.normal);
			sprite.setName("bubble_" + word);

			this.leftWords.push(word);
			
			var layer = this;
			
			attachEvent(sprite, function(target) {
				
				var cword = target.getName().substring("bubble_".length);
				
				cc.audioEngine.stopAllEffects();
				
				//首先把单词音发出
				cc.audioEngine.playEffect(rounds[currentData.round][cword].mp3, false);
				
				if (currentData.word == cword) {
					//泡泡 爆炸， 出下一个单词或当前轮结束
					target.setScale(1.1);
					cc.eventManager.pauseTarget(target.parent,true);
				}
				
				target.scheduleOnce(function() {
					if (currentData.word == cword) {
						//移除注册的touch事件避免被再次点击
						//target.removeTouchEventListenser();
						
						//动画action
						var ac = layer.createBombAction();
						
						//播放泡泡爆炸效果
						var seqAc = cc.Sequence.create(
								ac,   //播放动作
								cc.CallFunc.create(function() {
									//动作完成后
									layer.next();
									target.removeFromParent();
								}, 
								target));
						cc.audioEngine.stopAllEffects();
						cc.audioEngine.playEffect(res.bomb_mp3, false);
						//播放动作执行
						target.runAction(seqAc);
						
					} else {
						//点击错误，要播放错误提示音
						cc.audioEngine.stopAllEffects();
						cc.audioEngine.playEffect(res.wrong_mp3, false);
					}
				}, 1);
			});
			
			this.addChild(sprite);
			this.bubbles.push(sprite);
		}
		
		cc.eventManager.pauseTarget(this,true);
		this.fallSprites();
		
		this.leftWords = this.leftWords.sort(function(){
			return cc.random0To1() > 0.5;
		});
		this.next();
	},
	
	next: function() {
		if (this.leftWords.length>0) {
			currentData.word = this.leftWords.pop();
			cc.audioEngine.playEffect(rounds[currentData.round][currentData.word].mp3, false);
			this.scheduleOnce(function() {
				cc.eventManager.resumeTarget(this,true);
			}, 2);
		} else {
			if (rounds.length-1>currentData.round) {
				//判断存在下一轮则加载下一轮
				currentData.round ++; 
				this.loadRound(currentData.round);
				cc.eventManager.resumeTarget(this,true);
			} else {
				this.celebrate();
				//游戏结束
			}
		}
	},
	
	celebrate: function() {
		this.getParent().addChild(new CelebrationLayer(), 8);
		
		/*
		var size = cc.winSize;
		var girlSprite = createAnimatedSprite(res.celebration_girl_plist, "163", 23, 0.03);
		girlSprite.attr({
			x: size.width/2,
			y: size.height/2
		});
		
		this.addChild(girlSprite, 100);
		*/
	},
	
	//创建一个精灵消失动画
	createBombAction: function() {
		var frames = [];
		for(var i=0; i<5; i ++) {
			var str = "bomb000" + i;
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}

		var animation = new cc.Animation(frames, 0.03);
		var action = new cc.Animate(animation);
		return action;
	}
});

var currentData = {
		round: 0
};

function attachEvent(sprite, cb) {
	cc.eventManager.addListener(cc.EventListener.create({
		event: cc.EventListener.TOUCH_ONE_BY_ONE,
		swallowTouches: true,
		onTouchBegan: function(touch, event) {
			var pos = touch.getLocation();
			var target = event.getCurrentTarget();
			if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
				cb(target);
				return true;
			}
			return false;
		}
	}), sprite);
}

var PopoScene = cc.Scene.extend({
	onEnter : function () {
		this._super();
		
		//this.addChild(new BackAnimatedLayer(), 0);
		this.addChild(new BgLayer(), 1);
		this.addChild(new PlayLayer(), 2, 5);
		//this.addChild(new CelebrationLayer(), 8);
		
		this.addChild(new ForLayer(),10);
	}
});