var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Forbg_png: "res/forbg.png",
    PopobgSea_png: "res/bg1.png",
    Popobg_png: "res/bg2.png",
    Head_png: "res/head.png",
    Hand_png: "res/hand.png",
    Elbow_png: "res/elbow.png",
    Feet_png: "res/feet.png",
    Next_png: "res/next.png",
    Help_png: "res/help.png",
    Laba_on_png: "res/laba_on.png",
    Laba_off_png: "res/laba_off.png",
    
    bomb_plist : "res/bomb.plist",
    xiaoyu_plist: "res/xiaoyu.plist",
    popo_plist: "res/popo.plist",
    fisha_plist: "res/fisha.plist",
    haimb_plist: "res/haimab.plist",
    pokeTitle_png: "res/b1.png",
    shell_png: "res/z1.png",
    background_mp3: "res/bg.mp3",
    wrong_mp3: "res/wrong.mp3",
    ding_mp3:"res/ding.mp3",
    bomb_mp3: "res/bomb.mp3",
    
    poke_the_bubble_mp3: "res/pokethebubble.mp3",
    haima_animation: "res/haima.ExportJson",
    haima0_plist: "res/haima0.plist",
    haima0_png: "res/haima0.png",
    
    zhipian_animation: "res/zhipian.ExportJson",
    zhipian_plist: "res/zhipian0.plist",
    zhipian_png: "res/zhipian0.png",
    
    
    celebration_girl_plist: "res/celebrate_girl.plist",
    celebration_girl_png: "res/celebrate_girl.png",
    	
	picfly_plist: "res/picfly.plist",
	picfly_png: "res/picfly.png"
};

var rounds = [
  	{
  		horn :
  		{
  			mp3: "res/horn.mp3",
  			bubble: {
  				normal : "res/horn.png",
  				w: 192,
  				h: 194
  			}
  		},
  		leg: {
  			mp3: "res/leg.mp3",
  			bubble: {
  				normal : "res/leg.png",
  				w: 185,
  				h: 184
  			}
  		},
  		foot: {
  			mp3: "res/foot.mp3",
  			bubble: {
  				normal : "res/foot.png",
  				w: 188,
  				h: 185
  			}
  		},
  		hand: {
  			mp3: "res/hand1.mp3",
  			bubble: {
  				normal : "res/hand.png",
  				w: 183, 
  				h: 184
  			}
  		}
  	},
          	
	{
		elbow :
		{
			mp3: "res/elbow.mp3",
			bubble: {
				normal : "res/elbow.png",
				w: 183,
				h: 183
			}
		},
		head: {
			mp3: "res/face.mp3",
			bubble: {
				normal : "res/head.png",
				w: 184,
				h: 184
			}
		},
		hand: {
			name: "hand",
			mp3: "res/hand.mp3",
			bubble: {
				normal : "res/hand.png",
				w: 193,
				h: 194
			}
		},
		feet: {
			name: "feet",
			mp3: "res/feet.mp3",
			bubble: {
				normal : "res/feet.png",
				w: 184, 
				h: 184
			}
		}
	}
];


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i=0; i<rounds.length; i++) {
	var round = rounds[i];
	for (var r in round) {
		g_resources.push(round[r].bubble.normal);
		g_resources.push(round[r].mp3);
	}
}

