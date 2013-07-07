var Is_Touch = 0;

Me = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 150, 200);
		this.image = game.assets['enemy_usa3.png'];
		this.addEventListener('touchstart', function() {
            Is_Touch = 1;
		});
        this.addEventListener('touchend', function() {
            Is_Touch = 0;
		});
	}
});

Fire_Me = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_me.png'];
        this.addEventListener('enterframe', function() {
            this.y -= 10;
		});
    }
});

Fire_Enemy = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_enemy.png'];
        this.v = 10;
        this.addEventListener('enterframe', function() {
            this.y += this.v;
            if (this.y > height + this.height) {
                this.v = 0;
                this.y = -height;
            }
		});
    }
});

Enemy1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 144, 170);
        this.hp = 1;
        this.amp = Math.floor(width/2*Math.random());
        this.v = Math.floor(3*Math.random()) + 1;
        this.axis = Math.floor(width*Math.random());
		this.image = game.assets['icon_homepage.png'];
        this.fire = new Array(5);
        this.fire_count = 50;
        this.addEventListener('enterframe', function() {
            if(this.y > height+this.height) {
                this.y = - height/3;
            }
            if (this.fire_count < 0) {
                this.fire_count = 50;
            }
            this.fire_count--;
		});
	}
});

function select_fire_me_num(fire_me) {
    for (var i = 0; i < fire_me.length; i++) {
        if (fire_me[i].y < 0) {
            return i;
        }
    }
    return -1;
}

function is_collisioned (obj1, obj2) {
    var obj1_x = obj1.x + obj1.width/2;
    var obj1_y = obj1.y + obj1.height/2;
    var obj2_x = obj2.x + obj2.width/2;
    var obj2_y = obj2.y + obj2.height/2;
    if (Math.sqrt(Math.pow((obj1_x - obj2_x), 2) + Math.pow((obj1_y - obj2_y), 2)) < (obj1.width + obj2.width)/2) {
        return 1;
    }
    return 0;
}

function display_point(point, display_point) {
    console.log(point);
    var num5_s = Math.floor(point / 10000);
    var num5_a = point % 10000;
    console.log(num5_s);
    var num4_s = Math.floor(num5_a / 1000);
    var num4_a = num5_a % 1000;
    console.log(num4_s);
    var num3_s = Math.floor(num4_a /  100);
    var num3_a = num4_a %  100;
    console.log(num3_s);
    var num2_s = Math.floor(num3_a /   10);
    var num2_a = num3_a %   10;
    console.log(num2_s);
    var num1_s = Math.floor(num2_a);
    console.log(num1_s);
    display_point[4].frame = num5_s;
    display_point[3].frame = num4_s;
    display_point[2].frame = num3_s;
    display_point[1].frame = num2_s;
    display_point[0].frame = num1_s;
}


function shooting_menu (game, scene) {
    var bg = new Sprite(width, height);
    bg.image = game.assets['back_sinkei.png'];
    scene.addChild(bg);
    scene.addEventListener(Event.TOUCH_START, function(e) {
        audio_back.pause();
        audio_back.currentTime = 0;
        game.replaceScene(game.game2Scene());
    });
    return scene;
}

function shooting_start (game, scene) {
    var bg1 = new Sprite(width, height);
    bg1.image = game.assets['shooting/shooting_back1.png'];
    scene.addChild(bg1);
    var bg2 = new Sprite(width, height);
    bg2.image = game.assets['shooting/shooting_back2.png'];
    bg2.y = -height;
    scene.addChild(bg2);
    
    var point = 0;
    var you_point = new Array(5);
    for (var i = 0; i < you_point.length; i++) {
        you_point[i] = new Sprite(POINT_NUM_WIDTH, POINT_HEIGHT);
        you_point[i].image = game.assets['points.png'];
        you_point[i].x = width - POINT_NUM_WIDTH * (i + 1);
        you_point[i].x += POINT_NUM_WIDTH/3 * i;
        you_point[i].y = 0;
        you_point[i].frame = 0;
        scene.addChild(you_point[i]);
    }
    
    // me
    var me = new Me();
    me.x = (width - me.width)/2;
    me.y = height - me.height;
    scene.addChild(me);
        
    scene.addEventListener("touchmove", function(e) {
        if (Is_Touch != 0) {
            me.x = e.localX - me.width/2;
        }
    });
    
    // init : fire of me
    var count = 0;
    var fire_me = new Array(10);
    for (var i = 0; i < fire_me.length; i++){
        fire_me[i] = new Fire_Me();
        fire_me[i].x = -1;
        fire_me[i].y = -1;
    }
    
    // init : enemy loop
    var enemy1 = new Array(3);
    for (var i = 0; i < enemy1.length; i++) {
        enemy1[i] = new Enemy1();
        enemy1[i].y = -10 - width/3 * i;
        enemy1[i].hp = 5;
        scene.addChild(enemy1[i]);
        for (var j = 0; j < enemy1[i].fire.length; j++) {
            enemy1[i].fire[j] = new Fire_Enemy();
            enemy1[i].fire[j].x = -1;
            enemy1[i].fire[j].y = -1;
        }
    }
    
    scene.addEventListener("enterframe", function(e) {
        //bg
        if (bg1.y >= height) {
            bg1.y = -height;
        } else {
            bg1.y++;
        }
        if (bg2.y >= height) {
            bg2.y = -height;
        } else {
            bg2.y++;
        }
        
        if (count % 10 == 0) {
            var num = select_fire_me_num(fire_me);
            if (num != -1) {
                fire_me[num] = new Fire_Me();
                fire_me[num].x = me.x + me.width/2;
                fire_me[num].y = me.y;
                scene.addChild(fire_me[num]);
            }
        }
        
        // enemy loop
        for (var i = 0; i < enemy1.length; i++) {
            enemy1[i].x = enemy1[i].axis + enemy1[i].amp * Math.sin(count/100);
            enemy1[i].y += enemy1[i].v;
            if (is_collisioned(enemy1[i], me)){
                game.replaceScene(game.menuScene());
            }
            if(enemy1[i].y > 0) {
                if(enemy1[i].fire_count == 0) {
                    var fire_num = select_fire_me_num(enemy1[i].fire);
                    if (fire_num != -1) {
                        enemy1[i].fire[fire_num] = new Fire_Enemy();
                        enemy1[i].fire[fire_num].x = enemy1[i].x + enemy1[i].width/2;
                        enemy1[i].fire[fire_num].y = enemy1[i].y + enemy1[i].height;
                        enemy1[i].fire[fire_num].v = enemy1[i].v + 5;
                        scene.addChild(enemy1[i].fire[fire_num]);
                    }
                }
            }
            // enemy fire loop
            for (var j = 0; j < enemy1[i].fire.length; j++) {
                if(is_collisioned(enemy1[i].fire[j], me)) {
                    game.replaceScene(game.menuScene());
                }
            }
        }
        
        // fire_me loop
        for (var i = 0; i < fire_me.length; i++) {
            for (var j = 0; j < enemy1.length; j++) {
                if (is_collisioned(fire_me[i], enemy1[j]) == 1 && fire_me[i].y > 0) {
                    fire_me[i].y = -50;
                    enemy1[j].hp--;
                    if (enemy1[j].hp == 0) {
                        point++;
                        display_point(point, you_point);
                        enemy1[j].y = -200;
                        enemy1[j].hp = 5;
                    }
                }
            }
        }

        count++;
    });
    
    return scene;
}
